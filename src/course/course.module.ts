import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CourseService } from "./course.service";
import { CourseController } from "./course.controller";

import { Course } from "src/entity/course.entity";
import { TagModule } from "src/tag/tag.module";
import { CourseTagModule } from "src/course-tag/course-tag.module";

@Module({
  imports: [TypeOrmModule.forFeature([Course]), TagModule, CourseTagModule],
  providers: [CourseService],
  controllers: [CourseController],
  exports: [CourseService],
})
export class CourseModule {}
