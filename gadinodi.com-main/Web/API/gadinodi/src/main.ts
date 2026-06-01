import "dotenv/config";
import "reflect-metadata";

import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import compression from "compression";
import helmet from "helmet";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const uiOrigins = (
    process.env.UI_ORIGIN ?? "http://localhost:3000,http://127.0.0.1:3000"
  )
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  app.enableShutdownHooks();
  app.setGlobalPrefix("api");
  app.use(helmet());
  app.use(compression());
  app.enableCors({
    origin: uiOrigins,
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const host = process.env.HOST ?? "127.0.0.1";
  const port = Number(process.env.PORT ?? 4000);
  await app.listen(port, host);
}

bootstrap();
