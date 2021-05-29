import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";

import { version } from "../package.json";

console.log(`version: ${version}`);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
