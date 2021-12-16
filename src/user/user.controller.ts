import { Controller, Delete, HttpException, Param, ParseIntPipe } from "@nestjs/common";

import { getErrorHttpStatusCode, getErrorMessage } from "src/common/lib/error";

import { CourseImportationService } from "src/course-importation/course-importation.service";

import { CourseService } from "src/course/course.service";

import { WorkDoneService } from "src/work-done/work-done.service";

import { WorkTodoService } from "src/work-todo/work-todo.service";

@Controller("users")
export class UserController {
  constructor(
    private readonly courseService: CourseService,
    private readonly courseImportationService: CourseImportationService,
    private readonly workTodoService: WorkTodoService,
    private readonly workDoneService: WorkDoneService
  ) {}

  @Delete(":userId")
  async withdrawarUser(@Param("userId", ParseIntPipe) userId: number) {
    try {
      await this.workDoneService.withdrawalUser(userId);
      await this.workTodoService.withdrawalUser(userId);
      await this.courseImportationService.withdrawalUser(userId);
      await this.courseService.withdrawalUser(userId);
    } catch (error) {
      const httpStatusCode = getErrorHttpStatusCode(error);
      const message = getErrorMessage(error);

      // API에 에러를 토스
      throw new HttpException(message, httpStatusCode);
    }
  }
}
