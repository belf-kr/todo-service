import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";

import { AppModule } from "./app.module";

import { version } from "../package.json";

console.log(`version: ${version}`);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const port = configService.get("port");

  console.log(`listening at http://localhost:${port}`);
  await app.listen(port);
}
bootstrap();
