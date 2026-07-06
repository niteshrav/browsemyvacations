import { BadRequestException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { BMV_DEV_API_BASE_URL, BMV_DEV_API_PORT } from "@bmv/shared";
import { MediaService } from "./media.service";

describe("MediaService", () => {
  let service: MediaService;

  const configMock = {
    get: jest.fn((key: string, defaultValue?: string) => {
      const map: Record<string, string> = {
        NODE_ENV: "test",
        PORT: String(BMV_DEV_API_PORT),
        PUBLIC_API_BASE_URL: BMV_DEV_API_BASE_URL,
      };
      return map[key] ?? defaultValue;
    }),
    getOrThrow: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [MediaService, { provide: ConfigService, useValue: configMock }],
    }).compile();
    service = module.get(MediaService);
  });

  it("rejects missing file buffer", async () => {
    await expect(
      service.uploadPackageImage({} as Express.Multer.File),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it("stores image locally when Cloudinary is not configured", async () => {
    const url = await service.uploadPackageImage({
      buffer: Buffer.from("fake-image"),
      mimetype: "image/jpeg",
      size: 11,
    } as Express.Multer.File);
    expect(url).toMatch(new RegExp(`^http:\\/\\/localhost:${BMV_DEV_API_PORT}\\/uploads\\/[a-f0-9]+\\.jpg$`));
  });
});
