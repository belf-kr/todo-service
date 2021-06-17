import { Body, Controller, Post } from "@nestjs/common";

import { WorkTodoType } from "./work-todo.type";

import { getErrorHttpStatusCode, getErrorMessage } from "src/common/lib/error";

@Controller("work-todo")
export class WorkTodoController {
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
