import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CourseTagService } from "./course-tag.service";
import { CourseTagController } from "./course-tag.controller";

import { CourseTag } from "src/entity/course-tag.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CourseTag])],
  providers: [CourseTagService],
  controllers: [CourseTagController],
})
export class CourseTagModule {}
