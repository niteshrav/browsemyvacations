import { ValidationPipe } from "@nestjs/common";
import { BMV_DEV_API_PORT, BMV_DEV_SITE_URL } from "@bmv/shared";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import { AppModule } from "./app.module";

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

async function bootstrap() {
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

  const corsOrigin = process.env.CORS_ORIGIN ?? BMV_DEV_SITE_URL;
  app.enableCors({
    origin: corsOrigin.split(",").map((o) => o.trim()),
    credentials: true,
  });

  const port = process.env.PORT ?? String(BMV_DEV_API_PORT);
  await app.listen(port);
  console.log(`BMV API running on http://localhost:${port}/api/v1`);
}

bootstrap();
