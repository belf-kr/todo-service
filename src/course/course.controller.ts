import { Controller } from "@nestjs/common";

import { CRUDController } from "src/common/crud.controller";
import { Course } from "src/entity/course.entity";

import { CourseService } from "./course.service";

@Controller("course")
export class CourseController extends CRUDController<Course> {
  constructor(private readonly courseService: CourseService) {
    super(courseService);
  }
}
