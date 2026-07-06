import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { resolveAdminSeedCredentials } from "@bmv/shared";
import request from "supertest";
import { AppModule } from "../src/app.module";

describe("Auth (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix("api/v1");
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("POST /admin/auth/login accepts seeded admin credentials", async () => {
    const { email, password } = resolveAdminSeedCredentials({});

    const res = await request(app.getHttpServer())
      .post("/api/v1/admin/auth/login")
      .send({ email, password });

    expect(res.status).toBe(201);
    expect(typeof res.body.accessToken).toBe("string");
    expect(res.body.accessToken.length).toBeGreaterThan(10);
  });

  it("POST /admin/auth/login rejects invalid password", async () => {
    const { email } = resolveAdminSeedCredentials({});

    const res = await request(app.getHttpServer())
      .post("/api/v1/admin/auth/login")
      .send({ email, password: "wrong-password-123" });

    expect(res.status).toBe(401);
  });

  it("POST /admin/auth/login rejects invalid email format", async () => {
    const res = await request(app.getHttpServer())
      .post("/api/v1/admin/auth/login")
      .send({ email: "not-an-email", password: "changeme123" });

    expect(res.status).toBe(400);
  });
});
