import { Body, Controller, Delete, Get, HttpException, Param, ParseIntPipe, Post, Query, ValidationPipe } from "@nestjs/common";

import { WorkTodoService } from "./work-todo.service";
import { WorkTodoDto } from "./work-todo.dto";

import { getErrorHttpStatusCode, getErrorMessage } from "src/common/lib/error";
import { CRUDController } from "src/common/crud.controller";

import { WorkTodo } from "src/entity/work-todo.entity";

@Controller("work-todos")
export class WorkTodoController extends CRUDController<WorkTodo> {
  constructor(private readonly workTodoService: WorkTodoService) {
    super(workTodoService);
  }

  @Post()
  async createWorkTodo(@Body(new ValidationPipe({ groups: ["userInput"] })) workTodoInput: WorkTodoDto) {
    try {
      await this.workTodoService.createWorkTodo(workTodoInput);

      return;
    } catch (error) {
      // API에 에러를 토스
      const httpStatusCode = getErrorHttpStatusCode(error);
      const message = getErrorMessage(error);

      throw new HttpException(message, httpStatusCode);
    }
  }

  @Get()
  async getWorkTodosByConditions(@Query("courseId", ParseIntPipe) courseId: number) {
    try {
      // 할일 리스트 저장
      const workTodoServiceResult = await this.workTodoService.getWorkTodosByConditions(courseId);

      return workTodoServiceResult;
    } catch (error) {
      const httpStatusCode = getErrorHttpStatusCode(error);
      const message = getErrorMessage(error);

      // API에 에러를 토스
      throw new HttpException(message, httpStatusCode);
    }
  }

  @Delete(":id")
  async deleteWorkTodo(@Param("id", ParseIntPipe) id: number) {
    try {
      await this.workTodoService.deleteWorkTodo(id);

      return;
    } catch (error) {
      const httpStatusCode = getErrorHttpStatusCode(error);
      const message = getErrorMessage(error);

      // API에 에러를 토스
      throw new HttpException(message, httpStatusCode);
    }
  }
}
