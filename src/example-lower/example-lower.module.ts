import { Module } from "@nestjs/common";
import { ExampleLowerService } from "./example-lower.service";
import { ExampleLowerController } from "./example-lower.controller";

@Module({
  controllers: [ExampleLowerController],
  providers: [ExampleLowerService],
})
export class ExampleLowerModule {}
