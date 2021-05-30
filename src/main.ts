import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";

import { version } from "../package.json";

console.log(`version: ${version}`);

async function bootstrap() {
  const port = 3000;
  const app = await NestFactory.create(AppModule);
  console.log(`listening at http://localhost:${port}`);
  await app.listen(port);
}
bootstrap();
