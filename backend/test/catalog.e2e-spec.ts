import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as bcrypt from "bcryptjs";
import request from "supertest";
import { AppModule } from "../src/app.module";
import { PrismaService } from "../src/prisma/prisma.service";

describe("Catalog (e2e)", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let token: string;
  let destinationId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix("api/v1");
    await app.init();

    prisma = app.get(PrismaService);

    const email = `e2e-${Date.now()}@test.com`;
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

  it("GET /health returns ok or degraded", async () => {
    const res = await request(app.getHttpServer()).get("/api/v1/health");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("status");
  });

  it("GET /api/v1 returns service metadata", async () => {
    const res = await request(app.getHttpServer()).get("/api/v1");
    expect(res.status).toBe(200);
    expect(res.body.service).toBe("bmv-api");
    expect(res.body.health).toBe("/api/v1/health");
  });

  it("admin can create destination and package; public can list", async () => {
    const slug = `e2e-dest-${Date.now()}`;
    const destRes = await request(app.getHttpServer())
      .post("/api/v1/admin/destinations")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "E2E City", slug, displayOrder: 99, active: true });
    expect(destRes.status).toBe(201);
    destinationId = destRes.body.id;

    const pkgSlug = `e2e-pkg-${Date.now()}`;
    const pkgRes = await request(app.getHttpServer())
      .post("/api/v1/admin/packages")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "E2E Package",
        slug: pkgSlug,
        durationDays: 3,
        durationNights: 2,
        shortDescription: "E2E test package",
        priceFrom: 12000,
        destinationIds: [destinationId],
        itineraryDays: [
          { dayNumber: 1, title: "Day 1", cities: ["E2E City"], summary: "Explore." },
        ],
      });
    expect(pkgRes.status).toBe(201);

    const listRes = await request(app.getHttpServer())
      .get("/api/v1/packages")
      .query({ destination: slug });
    expect(listRes.status).toBe(200);
    expect(listRes.body.some((p: { slug: string }) => p.slug === pkgSlug)).toBe(true);

    const detailRes = await request(app.getHttpServer()).get(`/api/v1/packages/${pkgSlug}`);
    expect(detailRes.status).toBe(200);
    expect(detailRes.body.itinerary).toHaveLength(1);
  });
});
