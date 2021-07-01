import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Res } from "@nestjs/common";
import { Response } from "express";

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

  @Post()
  async createCourse(@Res() res: Response, @Body() courseInput: CourseType) {
    try {
      await this.courseService.createCourse(courseInput);
      await this.courseService.createNewTags(courseInput.tags);
      await this.courseService.createCourseTag(courseInput);

      res.status(HttpStatus.CREATED).send();
    } catch (error) {
      const httpStatusCode = getErrorHttpStatusCode(error);
      const message = getErrorMessage(error);

      // API에 에러를 토스
      throw new HttpException(message, httpStatusCode);
    }
  }

  @Get()
  async getAllCourses(@Res() res: Response) {
    try {
      // 코스 리스트 저장
      const courseServiceResult = await this.courseService.getAllCourses();

      res.status(HttpStatus.OK).send({
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
  async deleteCourses(@Res() res: Response, @Param() params: any) {
    try {
      await this.courseService.deleteCourse(params.id);

      res.status(HttpStatus.OK).send();
    } catch (error) {
      // 동작에 실패한 경우 Catch 구문에 예외를 넘김
      const httpStatusCode = getErrorHttpStatusCode(error);
      const message = getErrorMessage(error);

      // API에 에러를 토스
      throw new HttpException(message, httpStatusCode);
    }
  }
}
