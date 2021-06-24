import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { WorkTodoService } from "./work-todo.service";
import { WorkTodoController } from "./work-todo.controller";

import { WorkTodo } from "src/entity/work-todo.entity";

import { CourseModule } from "src/course/course.module";

@Module({
  imports: [TypeOrmModule.forFeature([WorkTodo]), CourseModule],
  providers: [WorkTodoService],
  controllers: [WorkTodoController],
  exports: [WorkTodoService],
})
export class WorkTodoModule {}
