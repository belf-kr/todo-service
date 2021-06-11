import { Body, Controller, HttpException, HttpStatus, Post } from "@nestjs/common";

import { CRUDController } from "src/common/crud.controller";
import { getErrorHttpStatusCode, getErrorMessage } from "src/common/lib/error";
import { Course } from "src/entity/course.entity";

import { CourseService } from "./course.service";

@Controller("course")
export class CourseController extends CRUDController<Course> {
  constructor(private readonly courseService: CourseService) {
    super(courseService);
  }

  @Post("create-course")
  async createCourse(@Body() courseEntity: Course[]): Promise<void> {
    try {
      await this.courseService.createCourse(courseEntity);

      return Object.assign({
        status: HttpStatus.CREATED,
        msg: `create successfully`,
      });
    } catch (error) {
      const httpStatusCode = getErrorHttpStatusCode(error);
      const message = getErrorMessage(error);
      throw new HttpException(message, httpStatusCode);
    }
  }
}
