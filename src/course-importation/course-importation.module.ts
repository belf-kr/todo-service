import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CourseImportationService } from "./course-importation.service";

import { CourseImportation } from "src/entity/course-importation.entity";

import { CourseModule } from "src/course/course.module";

@Module({
  imports: [TypeOrmModule.forFeature([CourseImportation]), forwardRef(() => CourseModule)],
  providers: [CourseImportationService],
  exports: [CourseImportationService],
})
export class CourseImportationModule {}
