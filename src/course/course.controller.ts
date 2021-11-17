import { Body, Controller, Delete, Get, HttpException, Param, ParseIntPipe, Post, Query, ValidationPipe } from "@nestjs/common";

import { CourseService } from "./course.service";
import { CoursePostDto } from "./course-post.dto";
import { CourseGetDto } from "./course-get.dto";
import { CourseQuerystringDto } from "./course-querystring.dto";

import { getErrorHttpStatusCode, getErrorMessage } from "src/common/lib/error";
import { CRUDController } from "src/common/crud.controller";

import { Course } from "src/entity/course.entity";

@Controller("courses")
export class CourseController extends CRUDController<Course> {
  constructor(private readonly courseService: CourseService) {
    super(courseService);
  }

  @Post()
  async createCourse(@Body(new ValidationPipe({ groups: ["userCreate"] })) coursePostDtoInput: CoursePostDto) {
    try {
      await this.courseService.createCourse(coursePostDtoInput);
      await this.courseService.createNewTags(coursePostDtoInput.tags);
      await this.courseService.createCourseTag(coursePostDtoInput);
    } catch (error) {
      const httpStatusCode = getErrorHttpStatusCode(error);
      const message = getErrorMessage(error);

      // API에 에러를 토스
      throw new HttpException(message, httpStatusCode);
    }

    return;
  }

  @Get()
  async getAllCourses(@Query("userId") userId: number) {
    let serviceResult: CourseGetDto[];

    try {
      const querystringInput = new CourseQuerystringDto(userId);

      // 코스 리스트 저장
      serviceResult = await this.courseService.getAllCourses(querystringInput);
    } catch (error) {
      // 동작에 실패한 경우 Catch 구문에 예외를 넘김
      const httpStatusCode = getErrorHttpStatusCode(error);
      const message = getErrorMessage(error);

      // API에 에러를 토스
      throw new HttpException(message, httpStatusCode);
    }

    return serviceResult;
  }

  @Delete(":id")
  async deleteCourses(@Param("id", ParseIntPipe) id: number) {
    try {
      await this.courseService.deleteCourse(id);
    } catch (error) {
      // 동작에 실패한 경우 Catch 구문에 예외를 넘김
      const httpStatusCode = getErrorHttpStatusCode(error);
      const message = getErrorMessage(error);

      // API에 에러를 토스
      throw new HttpException(message, httpStatusCode);
    }

    return;
  }
}
