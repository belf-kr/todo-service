import { Controller } from "@nestjs/common";

import { CourseTagService } from "./course-tag.service";

import { CourseTag } from "src/entity/course-tag.entity";

import { CRUDController } from "src/common/crud.controller";

@Controller("course-tags")
export class CourseTagController extends CRUDController<CourseTag> {
  constructor(private readonly courseTagService: CourseTagService) {
    super(courseTagService);
  }
}
