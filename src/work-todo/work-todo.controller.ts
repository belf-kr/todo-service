import { Body, Controller, Delete, Get, HttpStatus, Post } from "@nestjs/common";

import { WorkTodoType } from "./work-todo.type";
import { WorkTodoService } from "./work-todo.service";

import { getErrorHttpStatusCode, getErrorMessage } from "src/common/lib/error";
import { CRUDController } from "src/common/crud.controller";

import { WorkTodo } from "src/entity/work-todo.entity";

@Controller("work-todo")
export class WorkTodoController extends CRUDController<WorkTodo> {
  constructor(private readonly workTodoService: WorkTodoService) {
    super(workTodoService);
  }

  @Post("create-work-todo")
  async createWorkTodo(@Body() workTodoInput: WorkTodoType): Promise<HttpStatus> {
    try {
      await this.workTodoService.createWorkTodo(workTodoInput);

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

  @Get("get-all-work-todos")
  async getAllWorkTodos(): Promise<HttpStatus> {
    try {
      // 할일 리스트 저장
      const workTodoServiceResult: WorkTodo[] = await this.workTodoService.getAllWorkTodos();

      if (!workTodoServiceResult.length) {
        throw new Error("할일이 존재하지 않습니다.");
      }

      return Object.assign({
        todo_list: workTodoServiceResult,
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

  @Delete("delete-work-todo")
  async deleteWorkTodo(@Body() workTodoInput: WorkTodoType): Promise<HttpStatus> {
    try {
      await this.workTodoService.deleteWorkTodo(workTodoInput);

      return Object.assign({
        msg: `delete successfully`,
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
}
