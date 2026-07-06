import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as bcrypt from "bcryptjs";
import request from "supertest";
import { AppModule } from "../src/app.module";
import { PrismaService } from "../src/prisma/prisma.service";

describe("Meter (e2e)", () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix("api/v1");
    await app.init();

    const prisma = app.get(PrismaService);
    const email = `e2e-meter-${Date.now()}@test.com`;
    const passwordHash = await bcrypt.hash("testpass123", 10);
    await prisma.client.adminUser.create({
      data: { email, passwordHash, name: "E2E", role: "admin", active: true },
    });

    const login = await request(app.getHttpServer())
      .post("/api/v1/admin/auth/login")
      .send({ email, password: "testpass123" });
    token = login.body.accessToken;
  });

  afterAll(async () => {
    await app.close();
  });

  it("GET /meter/options returns destinations and tiers", async () => {
    const res = await request(app.getHttpServer()).get("/api/v1/meter/options");
    expect(res.status).toBe(200);
    expect(res.body.destinations.some((d: { slug: string }) => d.slug === "udaipur")).toBe(true);
    expect(res.body.destinations.some((d: { slug: string }) => d.slug === "jaipur")).toBe(true);
    expect(res.body.vehicleTiers.length).toBeGreaterThan(0);
  });

  it("POST /meter/calculate returns estimate for Udaipur", async () => {
    const res = await request(app.getHttpServer())
      .post("/api/v1/meter/calculate")
      .send({
        destinationSlugs: ["udaipur"],
        totalNights: 3,
        pickupTime: "09:00",
        dropoffTime: "18:00",
        travelDate: "2026-09-15",
        vehicleTierName: "Sedan",
      });
    expect(res.status).toBe(201);
    expect(res.body.sessionId).toBeDefined();
    expect(res.body.estimateMin).toBeGreaterThan(0);
    expect(res.body.estimateMax).toBeGreaterThan(res.body.estimateMin);
    expect(res.body.feasibility.feasibilityScore).toBeGreaterThan(0);
    expect(res.body.feasibility.descriptor).toBeDefined();
  });

  it("POST /meter/calculate returns estimate for Jaipur", async () => {
    const res = await request(app.getHttpServer())
      .post("/api/v1/meter/calculate")
      .send({
        destinationSlugs: ["jaipur"],
        totalNights: 3,
        pickupTime: "09:00",
        dropoffTime: "18:00",
        travelDate: "2026-09-15",
        vehicleTierName: "Sedan",
      });
    expect(res.status).toBe(201);
    expect(res.body.estimateMin).toBeGreaterThan(0);
  });

  it("POST /meter/calculate rejects unsupported destination", async () => {
    const res = await request(app.getHttpServer())
      .post("/api/v1/meter/calculate")
      .send({
        destinationSlugs: ["unsupported-city"],
        totalNights: 2,
        pickupTime: "10:00",
        dropoffTime: "17:00",
        travelDate: "2026-09-15",
        vehicleTierName: "Sedan",
      });
    expect(res.status).toBe(400);
  });

  it("admin can read meter config", async () => {
    const res = await request(app.getHttpServer())
      .get("/api/v1/admin/meter-config")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.destinationRates.length).toBeGreaterThan(0);
  });
});
