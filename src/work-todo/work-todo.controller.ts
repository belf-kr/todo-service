import { Body, Controller, Delete, Get, HttpException, Param, ParseIntPipe, Post, Query, ValidationPipe } from "@nestjs/common";

import { WorkTodoService } from "./work-todo.service";
import { WorkTodoGetDto } from "./work-todo-get.dto";
import { WorkTodoPostDto } from "./work-todo-post.dto";
import { WorkTodoQuerystringDto } from "./work-todo-querystring.dto";

import { getErrorHttpStatusCode, getErrorMessage } from "src/common/lib/error";
import { CRUDController } from "src/common/crud.controller";

import { WorkTodo } from "src/entity/work-todo.entity";

@Controller("work-todos")
export class WorkTodoController extends CRUDController<WorkTodo> {
  constructor(private readonly workTodoService: WorkTodoService) {
    super(workTodoService);
  }

  @Post()
  async createWorkTodo(@Body(new ValidationPipe({ groups: ["userInput"] })) workTodoPostInput: WorkTodoPostDto) {
    try {
      await this.workTodoService.createWorkTodo(workTodoPostInput);
      await this.workTodoService.createRepeatedDaysOfTheWeek(workTodoPostInput);
    } catch (error) {
      // API에 에러를 토스
      const httpStatusCode = getErrorHttpStatusCode(error);
      const message = getErrorMessage(error);

      throw new HttpException(message, httpStatusCode);
    }

    return;
  }

  // TODO: Custom pipe 만들어 param을 선택 사항 가능하게 만들기
  @Get()
  async getWorkTodosByConditions(
    @Query("userId") userId?: number,
    @Query("courseId") courseId?: number,
    @Query("activeDate") activeDate?: Date,
    @Query("maximumActiveDate") maximumActiveDate?: Date
  ) {
    let serviceResult: WorkTodoGetDto[];

    try {
      const querystringInput = new WorkTodoQuerystringDto(userId, courseId, activeDate, maximumActiveDate);

      // 할일 리스트 저장
      serviceResult = await this.workTodoService.getWorkTodosByConditions(querystringInput);
    } catch (error) {
      const httpStatusCode = getErrorHttpStatusCode(error);
      const message = getErrorMessage(error);

      // API에 에러를 토스
      throw new HttpException(message, httpStatusCode);
    }

    return serviceResult;
  }

  @Delete(":id")
  async deleteWorkTodo(@Query("userId") userId: number, @Param("id", ParseIntPipe) id: number) {
    try {
      await this.workTodoService.deleteWorkTodo(userId, id);
    } catch (error) {
      const httpStatusCode = getErrorHttpStatusCode(error);
      const message = getErrorMessage(error);

      // API에 에러를 토스
      throw new HttpException(message, httpStatusCode);
    }

    return;
  }
}
