import "reflect-metadata";

import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";

void (async () => {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
})();
