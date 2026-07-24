import "./load-env";
import { ValidationPipe } from "@nestjs/common";
import { BMV_DEV_API_PORT, BMV_DEV_SITE_URL } from "@bmv/shared";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { copyFile, mkdir } from "fs/promises";
import { join } from "path";
import { AppModule } from "./app.module";
import { createCorsOriginDelegate } from "./common/cors-origin";

const STATIC_ASSET_FILES = ["udaipur-city-palace.png"] as const;

function applySecurityHeaders(
  _req: unknown,
  res: { setHeader: (name: string, value: string) => void },
  next: () => void,
) {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  next();
}

async function syncBundledAssetsToUploads() {
  const assetsDir = join(process.cwd(), "assets");
  const uploadsDir = join(process.cwd(), "uploads");
  await mkdir(uploadsDir, { recursive: true });
  await Promise.all(
    STATIC_ASSET_FILES.map(async (filename) => {
      try {
        await copyFile(join(assetsDir, filename), join(uploadsDir, filename));
      } catch {
        // Asset may be missing in some environments; uploads stay optional.
      }
    }),
  );
}

async function bootstrap() {
  await syncBundledAssetsToUploads();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(applySecurityHeaders);
  app.useStaticAssets(join(process.cwd(), "uploads"), { prefix: "/uploads" });

  app.setGlobalPrefix("api/v1");
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: createCorsOriginDelegate(process.env.CORS_ORIGIN, BMV_DEV_SITE_URL),
    credentials: true,
  });

  const port = Number(process.env.PORT ?? BMV_DEV_API_PORT);
  await app.listen(port, "0.0.0.0");
  console.log(`BMV API running on http://0.0.0.0:${port}/api/v1`);
}

bootstrap();
