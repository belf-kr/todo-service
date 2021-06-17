import { Body, Controller, Post } from "@nestjs/common";

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
  async createWorkTodo(@Body() workTodoInput: WorkTodoType): Promise<void> {
    try {
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
