import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExampleUpper } from "src/entity/example-upper.entity";
import { ExampleUpperController } from "./example-upper.controller";
import { ExampleUpperService } from "./example-upper.service";

@Module({
  // Typeorm.forFeature 메소드를 사용해 사용할 엔테테를 인식 해 주지 않으면 에러가 발생한다.
  imports: [TypeOrmModule.forFeature([ExampleUpper])],
  controllers: [ExampleUpperController],
  providers: [ExampleUpperService],
})
export class ExampleUpperModule {}
