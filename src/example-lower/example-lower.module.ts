import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ExampleLowerService } from "./example-lower.service";
import { ExampleLowerController } from "./example-lower.controller";
import { ExampleLower } from "src/entity/example-lower.entity";

@Module({
  // import 구문을 module 에서 추가 해 주지 않으면 TypeORM 에러가 발생
  imports: [TypeOrmModule.forFeature([ExampleLower])],
  controllers: [ExampleLowerController],
  providers: [ExampleLowerService],
})
export class ExampleLowerModule {}
