import { Body, Controller, Delete, Get, HttpException, Param, ParseIntPipe, Post, Query, ValidationPipe } from "@nestjs/common";

import { CourseService } from "./course.service";
import { CoursePostDto } from "./course-post.dto";
import { CourseGetDto } from "./course-get.dto";
import { CourseQuerystringDto } from "./course-querystring.dto";

import { getErrorHttpStatusCode, getErrorMessage } from "src/common/lib/error";
import { CRUDController } from "src/common/crud.controller";

import { Course } from "src/entity/course.entity";

import { CourseImportationService } from "src/course-importation/course-importation.service";
import { CourseImportationDto } from "src/course-importation/course-importation.dto";

@Controller("courses")
export class CourseController extends CRUDController<Course> {
  constructor(private readonly courseService: CourseService, private readonly courseImportationService: CourseImportationService) {
    super(courseService);
  }

  @Post()
  async createCourse(@Body(new ValidationPipe({ groups: ["userInput"] })) coursePostDtoInput: CoursePostDto) {
    try {
      let courseEntity: Course;

      // course import
      if (coursePostDtoInput.originalCourseId) {
        courseEntity = await this.courseService.importCourse(coursePostDtoInput);

        await this.courseImportationService.createCoureseImportation(
          new CourseImportationDto({
            id: undefined,
            userId: coursePostDtoInput.userId,
            courseId: courseEntity.id,
            originalCourseId: coursePostDtoInput.originalCourseId,
          })
        );
      }
      // course 생성
      else {
        courseEntity = await this.courseService.createCourse(coursePostDtoInput);
      }
      await this.courseService.createNewTags(coursePostDtoInput.tags);
      await this.courseService.createCourseTag(courseEntity, coursePostDtoInput);
    } catch (error) {
      const httpStatusCode = getErrorHttpStatusCode(error);
      const message = getErrorMessage(error);

      // API에 에러를 토스
      throw new HttpException(message, httpStatusCode);
    }

    return;
  }

  @Get()
  async getCoursesByConditions(@Query("userId") userId?: number) {
    let serviceResult: CourseGetDto[];

    try {
      const querystringInput = new CourseQuerystringDto(userId);

      // 코스 리스트 저장
      serviceResult = await this.courseService.getCoursesByConditions(querystringInput);
    } catch (error) {
      // 동작에 실패한 경우 Catch 구문에 예외를 넘김
      const httpStatusCode = getErrorHttpStatusCode(error);
      const message = getErrorMessage(error);

      // API에 에러를 토스
      throw new HttpException(message, httpStatusCode);
    }

    return serviceResult;
  }

  @Get(":id")
  async getCourses(@Param("id", ParseIntPipe) id: number) {
    let serviceResult: CourseGetDto[];
    const querystringInput = new CourseQuerystringDto(undefined, id);

    try {
      serviceResult = await this.courseService.getCoursesByConditions(querystringInput);
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
  async deleteCourses(@Query("userId") userId: number, @Param("id", ParseIntPipe) id: number) {
    try {
      await this.courseService.deleteCourse(userId, id);
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
