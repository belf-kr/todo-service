import { Body, Controller, Delete, Get, HttpException, Param, ParseIntPipe, Post, ValidationPipe } from "@nestjs/common";

import { WorkTodoType } from "./work-todo.type";
import { WorkTodoService } from "./work-todo.service";

import { getErrorHttpStatusCode, getErrorMessage } from "src/common/lib/error";
import { CRUDController } from "src/common/crud.controller";

import { WorkTodo } from "src/entity/work-todo.entity";

@Controller("work-todos")
export class WorkTodoController extends CRUDController<WorkTodo> {
  constructor(private readonly workTodoService: WorkTodoService) {
    super(workTodoService);
  }

  @Post()
  async createWorkTodo(@Body(new ValidationPipe({ groups: ["userInput"] })) workTodoInput: WorkTodoType) {
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
  async getAllWorkTodos() {
    try {
      // 할일 리스트 저장
      const workTodoServiceResult = await this.workTodoService.getAllWorkTodos();

      return Object.assign({
        todo_list: workTodoServiceResult,
      });
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
