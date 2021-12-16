import { Module } from "@nestjs/common";

import { UserService } from "./user.service";
import { UserController } from "./user.controller";

import { CourseModule } from "src/course/course.module";

import { CourseImportationModule } from "src/course-importation/course-importation.module";

import { WorkTodoModule } from "src/work-todo/work-todo.module";

import { WorkDoneModule } from "src/work-done/work-done.module";

@Module({
  imports: [CourseModule, CourseImportationModule, WorkTodoModule, WorkDoneModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
