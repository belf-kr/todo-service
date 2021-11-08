import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { WorkTodoService } from "./work-todo.service";
import { WorkTodoController } from "./work-todo.controller";

import { WorkTodo } from "src/entity/work-todo.entity";

import { CourseModule } from "src/course/course.module";

import { RepeatedDaysOfTheWeekModule } from "src/repeated-days-of-the-week/repeated-days-of-the-week.module";

@Module({
  imports: [TypeOrmModule.forFeature([WorkTodo]), CourseModule, RepeatedDaysOfTheWeekModule],
  providers: [WorkTodoService],
  controllers: [WorkTodoController],
  exports: [WorkTodoService],
})
export class WorkTodoModule {}
