import { Module } from "@nestjs/common";
import { ExampleUpperController } from "./example-upper.controller";
import { ExampleUpperService } from "./example-upper.service";

@Module({
  controllers: [ExampleUpperController],
  providers: [ExampleUpperService],
})
export class ExampleUpperModule {}
