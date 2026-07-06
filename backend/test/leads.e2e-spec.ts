import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as bcrypt from "bcryptjs";
import request from "supertest";
import { AppModule } from "../src/app.module";
import { PrismaService } from "../src/prisma/prisma.service";

describe("Leads (e2e)", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix("api/v1");
    await app.init();

    prisma = app.get(PrismaService);

    const email = `e2e-leads-${Date.now()}@test.com`;
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

  it("POST /leads creates a package quote lead", async () => {
    const res = await request(app.getHttpServer())
      .post("/api/v1/leads")
      .send({
        fullName: "E2E Traveler",
        email: "e2e.traveler@example.com",
        phone: "9876543210",
        source: "package_detail",
        packageSlug: "standalone-single-city-udaipur-the-romantic-lake-escape",
        persons: 2,
        rooms: 1,
        message: "Looking for a lake-view hotel.",
      });

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.message).toContain("Thank you");
  });

  it("POST /leads rejects invalid email", async () => {
    const res = await request(app.getHttpServer()).post("/api/v1/leads").send({
      fullName: "Bad",
      email: "not-email",
      phone: "9876543210",
      source: "contact",
    });
    expect(res.status).toBe(400);
  });

  it("admin can list and update lead status", async () => {
    const create = await request(app.getHttpServer()).post("/api/v1/leads").send({
      fullName: "Admin List Test",
      email: "admin.list@example.com",
      phone: "9876500000",
      source: "contact",
      message: "Hello",
    });
    const leadId = create.body.id as string;

    const list = await request(app.getHttpServer())
      .get("/api/v1/admin/leads")
      .set("Authorization", `Bearer ${token}`);
    expect(list.status).toBe(200);
    expect(list.body.some((l: { id: string }) => l.id === leadId)).toBe(true);

    const patch = await request(app.getHttpServer())
      .patch(`/api/v1/admin/leads/${leadId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ status: "contacted" });
    expect(patch.status).toBe(200);
    expect(patch.body.status).toBe("contacted");
  });

  it("admin can export leads CSV", async () => {
    const res = await request(app.getHttpServer())
      .get("/api/v1/admin/leads/export")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.text).toContain("id,createdAt,status");
  });
});
