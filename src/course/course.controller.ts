import { Body, Controller, Delete, Get, HttpStatus, Post } from "@nestjs/common";

import { CourseService } from "./course.service";

import { getErrorHttpStatusCode, getErrorMessage } from "src/common/lib/error";
import { CRUDController } from "src/common/crud.controller";

import { CourseType } from "src/course/course.type";

import { Course } from "src/entity/course.entity";

@Controller("courses")
export class CourseController extends CRUDController<Course> {
  constructor(private readonly courseService: CourseService) {
    super(courseService);
  }

  @Post("create-course")
  async createCourse(@Body() courseInput: CourseType): Promise<void> {
    try {
      await this.courseService.createCourse(courseInput);
      await this.courseService.createNewTags(courseInput.tags);
      await this.courseService.createCourseTag(courseInput);

      return Object.assign({
        status: HttpStatus.CREATED,
        msg: `create successfully`,
      });
    } catch (error) {
      const httpStatusCode = getErrorHttpStatusCode(error);
      const message = getErrorMessage(error);

      // API에 에러를 토스
      return Object.assign({
        httpStatusCode: httpStatusCode,
        message: message,
      });
    }
  }

  @Get()
  async getAllCourses(): Promise<HttpStatus> {
    try {
      // 코스 리스트 저장
      const serviceResult = await this.courseService.getAllCourses();

      return Object.assign({
        course_list: serviceResult,
      });
    } catch (error) {
      // 동작에 실패한 경우 Catch 구문에 예외를 넘김
      const httpStatusCode = getErrorHttpStatusCode(error);
      const message = getErrorMessage(error);

      // API에 에러를 토스
      return Object.assign({
        httpStatusCode: httpStatusCode,
        message: message,
      });
    }
  }

  @Delete("delete-courses")
  async deleteCourses(@Body() courseInput: CourseType): Promise<HttpStatus> {
    try {
      await this.courseService.deleteCourse(courseInput);

      return Object.assign({
        msg: `delete successfully`,
      });
    } catch (error) {
      // 동작에 실패한 경우 Catch 구문에 예외를 넘김
      const httpStatusCode = getErrorHttpStatusCode(error);
      const message = getErrorMessage(error);

      // API에 에러를 토스
      return Object.assign({
        httpStatusCode: httpStatusCode,
        message: message,
      });
    }
  }
}
