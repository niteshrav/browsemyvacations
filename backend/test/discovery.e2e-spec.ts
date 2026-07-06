import { HOME_QUICK_PICK_CITIES } from "@bmv/shared";
import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as bcrypt from "bcryptjs";
import request from "supertest";
import { AppModule } from "../src/app.module";
import { PrismaService } from "../src/prisma/prisma.service";

describe("Discovery (e2e)", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let token: string;
  let packageId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix("api/v1");
    await app.init();

    prisma = app.get(PrismaService);

    const email = `e2e-disc-${Date.now()}@test.com`;
    const passwordHash = await bcrypt.hash("testpass123", 10);
    await prisma.client.adminUser.create({
      data: { email, passwordHash, name: "E2E", role: "admin", active: true },
    });

    const login = await request(app.getHttpServer())
      .post("/api/v1/admin/auth/login")
      .send({ email, password: "testpass123" });
    token = login.body.accessToken;

    const seeded = await prisma.client.package.findFirst({
      where: { slug: "standalone-single-city-udaipur-the-romantic-lake-escape" },
    });
    packageId = seeded?.id ?? "";
  });

  afterAll(async () => {
    await app.close();
  });

  it("GET /search?q=Udaipur returns matching packages", async () => {
    const res = await request(app.getHttpServer()).get("/api/v1/search").query({ q: "Udaipur" });
    expect(res.status).toBe(200);
    expect(res.body.query).toBe("Udaipur");
    expect(res.body.packages.length).toBeGreaterThan(0);
    expect(res.body.packages.some((p: { slug: string }) => p.slug === "standalone-single-city-udaipur-the-romantic-lake-escape")).toBe(
      true,
    );
    expect(
      res.body.packages.some(
        (p: { slug: string }) => p.slug === "standalone-single-city-kumbhalgarh-the-great-wall-of-india-trek",
      ),
    ).toBe(false);
  });

  it("GET /search without q returns 400", async () => {
    const res = await request(app.getHttpServer()).get("/api/v1/search").query({ q: "  " });
    expect(res.status).toBe(400);
  });

  it("GET /suggestions returns active quick pick destinations", async () => {
    const res = await request(app.getHttpServer()).get("/api/v1/suggestions");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    for (const city of HOME_QUICK_PICK_CITIES) {
      expect(res.body.some((s: { label: string }) => s.label === city)).toBe(true);
    }
    expect(res.body).toHaveLength(HOME_QUICK_PICK_CITIES.length);
  });

  it("POST /admin/packages/:id/images uploads image (local dev storage)", async () => {
    expect(packageId).toBeTruthy();

    const png = Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
      "base64",
    );

    const res = await request(app.getHttpServer())
      .post(`/api/v1/admin/packages/${packageId}/images`)
      .set("Authorization", `Bearer ${token}`)
      .attach("file", png, { filename: "test.png", contentType: "image/png" });

    expect(res.status).toBe(201);
    const images = res.body.images as string[];
    expect(images.some((url) => typeof url === "string" && url.includes("/uploads/"))).toBe(true);
  });
});
