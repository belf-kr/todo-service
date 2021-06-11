import { Module } from "@nestjs/common";
import { CourseTagService } from "./course-tag.service";
import { CourseTagController } from "./course-tag.controller";

@Module({
  providers: [CourseTagService],
  controllers: [CourseTagController],
})
export class CourseTagModule {}
