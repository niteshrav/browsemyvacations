import {
  BadRequestException,
  Injectable,
  ServiceUnavailableException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { BMV_DEV_API_BASE_URL, BMV_DEV_API_PORT } from "@bmv/shared";
import { createHash } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import { join } from "path";
import { v2 as cloudinary } from "cloudinary";

const ALLOWED_MIME = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_BYTES = 5 * 1024 * 1024;

@Injectable()
export class MediaService {
  private readonly uploadDir: string;

  constructor(private readonly config: ConfigService) {
    this.uploadDir = join(process.cwd(), "uploads");
  }

  async uploadPackageImage(file: Express.Multer.File): Promise<string> {
    if (!file?.buffer?.length) {
      throw new BadRequestException("Image file is required");
    }
    if (!ALLOWED_MIME.has(file.mimetype)) {
      throw new BadRequestException("Only JPEG, PNG, and WebP images are allowed");
    }
    if (file.size > MAX_BYTES) {
      throw new BadRequestException("Image must be 5MB or smaller");
    }

    const cloudName = this.config.get<string>("CLOUDINARY_CLOUD_NAME");
    if (cloudName) {
      return this.uploadToCloudinary(file);
    }

    if (this.config.get("NODE_ENV") === "production") {
      throw new ServiceUnavailableException(
        "Image upload requires Cloudinary configuration in production",
      );
    }

    return this.uploadToLocal(file);
  }

  private async uploadToCloudinary(file: Express.Multer.File): Promise<string> {
    cloudinary.config({
      cloud_name: this.config.getOrThrow<string>("CLOUDINARY_CLOUD_NAME"),
      api_key: this.config.getOrThrow<string>("CLOUDINARY_API_KEY"),
      api_secret: this.config.getOrThrow<string>("CLOUDINARY_API_SECRET"),
    });

    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "bmv/packages", resource_type: "image" },
        (err, result) => {
          if (err || !result?.secure_url) {
            reject(err ?? new Error("Cloudinary upload failed"));
            return;
          }
          resolve(result.secure_url);
        },
      );
      stream.end(file.buffer);
    });
  }

  private async uploadToLocal(file: Express.Multer.File): Promise<string> {
    await mkdir(this.uploadDir, { recursive: true });
    const ext = file.mimetype === "image/png" ? "png" : file.mimetype === "image/webp" ? "webp" : "jpg";
    const name = `${createHash("sha256").update(file.buffer).digest("hex").slice(0, 16)}.${ext}`;
    await writeFile(join(this.uploadDir, name), file.buffer);

    const port = this.config.get("PORT", String(BMV_DEV_API_PORT));
    const base = this.config.get("PUBLIC_API_BASE_URL", BMV_DEV_API_BASE_URL);
    return `${base.replace(/\/$/, "")}/uploads/${name}`;
  }
}
