import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { WorkTodoService } from "./work-todo.service";
import { WorkTodoController } from "./work-todo.controller";

import { WorkTodo } from "src/entity/work-todo.entity";
import { Course } from "src/entity/course.entity";
import { Tag } from "src/entity/tag.entity";

import { CourseService } from "src/course/course.service";
import { TagService } from "src/tag/tag.service";

@Module({
  imports: [TypeOrmModule.forFeature([WorkTodo, Course, Tag])],
  providers: [WorkTodoService, CourseService, TagService],
  controllers: [WorkTodoController],
})
export class WorkTodoModule {}
