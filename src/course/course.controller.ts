import { Body, Controller, Delete, Get, HttpException, Param, Post } from "@nestjs/common";

import { CourseService } from "./course.service";
import { CourseType } from "./course.type";

import { getErrorHttpStatusCode, getErrorMessage } from "src/common/lib/error";
import { CRUDController } from "src/common/crud.controller";

import { Course } from "src/entity/course.entity";

@Controller("courses")
export class CourseController extends CRUDController<Course> {
  constructor(private readonly courseService: CourseService) {
    super(courseService);
  }

  @Post()
  async createCourse(@Body() courseInput: CourseType) {
    try {
      await this.courseService.createCourse(courseInput);
      await this.courseService.createNewTags(courseInput.tags);
      await this.courseService.createCourseTag(courseInput);

      return;
    } catch (error) {
      const httpStatusCode = getErrorHttpStatusCode(error);
      const message = getErrorMessage(error);

      // API에 에러를 토스
      throw new HttpException(message, httpStatusCode);
    }
  }

  @Get()
  async getAllCourses() {
    try {
      // 코스 리스트 저장
      const courseServiceResult = await this.courseService.getAllCourses();

      return Object.assign({
        course_list: courseServiceResult,
      });
    } catch (error) {
      // 동작에 실패한 경우 Catch 구문에 예외를 넘김
      const httpStatusCode = getErrorHttpStatusCode(error);
      const message = getErrorMessage(error);

      // API에 에러를 토스
      throw new HttpException(message, httpStatusCode);
    }
  }

  @Delete(":id")
  async deleteCourses(@Param() params: any) {
    try {
      await this.courseService.deleteCourse(params.id);

      return;
    } catch (error) {
      // 동작에 실패한 경우 Catch 구문에 예외를 넘김
      const httpStatusCode = getErrorHttpStatusCode(error);
      const message = getErrorMessage(error);

      // API에 에러를 토스
      throw new HttpException(message, httpStatusCode);
    }
  }
}
