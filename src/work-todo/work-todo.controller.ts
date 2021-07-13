import { Body, Controller, Delete, Get, HttpException, Param, Post } from "@nestjs/common";

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
  async createWorkTodo(@Body() workTodoInput: WorkTodoType) {
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
  async deleteWorkTodo(@Param() params: any) {
    try {
      await this.workTodoService.deleteWorkTodo(params.id);

      return;
    } catch (error) {
      const httpStatusCode = getErrorHttpStatusCode(error);
      const message = getErrorMessage(error);

      // API에 에러를 토스
      throw new HttpException(message, httpStatusCode);
    }
  }
}
