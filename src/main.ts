import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

let APP_PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  init();
  await app.listen(APP_PORT);
}
bootstrap();

function init() {
  if (!process.env.STAGES) {
    process.env.STAGES = "LOCAL";
    APP_PORT = 3002;
  }
}
