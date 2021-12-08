import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { WorkDoneService } from "./work-done.service";
import { WorkDoneController } from "./work-done.controller";

import { WorkDone } from "src/entity/work-done.entity";

import { WorkTodoModule } from "src/work-todo/work-todo.module";

@Module({
  imports: [TypeOrmModule.forFeature([WorkDone]), WorkTodoModule],
  providers: [WorkDoneService],
  controllers: [WorkDoneController],
  exports: [WorkDoneService],
})
export class WorkDoneModule {}
