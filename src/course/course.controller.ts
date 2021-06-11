import { Body, Controller, HttpException, HttpStatus, Post } from "@nestjs/common";

import { CRUDController } from "src/common/crud.controller";
import { getErrorHttpStatusCode, getErrorMessage } from "src/common/lib/error";
import { Course } from "src/entity/course.entity";

import { CourseService } from "./course.service";

type TagType = {
  value: string;
};

type CourseType = {
  originalCourseID: number;
  color: string;
  creatorID: number;
  explanation: string;
  title: string;
  likeCount: number;
  tags: TagType[];
};

@Controller("course")
export class CourseController extends CRUDController<Course> {
  constructor(private readonly courseService: CourseService) {
    super(courseService);
  }

  @Post("create-course")
  async createCourse(@Body() coursesInput: CourseType): Promise<void> {
    try {
      await this.courseService.createCourse(coursesInput);

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
