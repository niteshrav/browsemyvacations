import { UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import * as bcrypt from "bcryptjs";
import { PrismaService } from "../prisma/prisma.service";
import { AuthService } from "./auth.service";

describe("AuthService", () => {
  let service: AuthService;
  const prisma = {
    adminUser: { findUnique: jest.fn() },
  };
  const jwt = { signAsync: jest.fn().mockResolvedValue("token-123") };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: { client: prisma } },
        { provide: JwtService, useValue: jwt },
      ],
    }).compile();
    service = module.get(AuthService);
  });

  it("rejects invalid credentials", async () => {
    prisma.adminUser.findUnique.mockResolvedValue(null);
    await expect(service.login("a@b.com", "wrong")).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it("returns token for valid credentials", async () => {
    const hash = await bcrypt.hash("secret12", 10);
    prisma.adminUser.findUnique.mockResolvedValue({
      id: "u1",
      email: "a@b.com",
      passwordHash: hash,
      active: true,
      role: "admin",
      name: "Admin",
    });
    const result = await service.login("a@b.com", "secret12");
    expect(result.accessToken).toBe("token-123");
    expect(jwt.signAsync).toHaveBeenCalled();
  });
});
