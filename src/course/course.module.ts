import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CourseService } from "./course.service";
import { CourseController } from "./course.controller";

import { Course } from "src/entity/course.entity";
import { TagService } from "src/tag/tag.service";
import { CourseTagService } from "src/course-tag/course-tag.service";
import { Tag } from "src/entity/tag.entity";
import { CourseTag } from "src/entity/course-tag.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Course, Tag, CourseTag])],
  providers: [CourseService, TagService, CourseTagService],
  controllers: [CourseController],
})
export class CourseModule {}
