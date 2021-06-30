import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Res } from "@nestjs/common";
import { Response } from "express";

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
  async createWorkTodo(@Res() res: Response, @Body() workTodoInput: WorkTodoType) {
    try {
      await this.workTodoService.createWorkTodo(workTodoInput);

      res.status(HttpStatus.CREATED).send({
        message: "할 일이 정상적으로 생성되었습니다.",
      });
    } catch (error) {
      // API에 에러를 토스
      const httpStatusCode = getErrorHttpStatusCode(error);
      const message = getErrorMessage(error);

      throw new HttpException(message, httpStatusCode);
    }
  }

  @Get()
  async getAllWorkTodos(@Res() res: Response) {
    try {
      // 할일 리스트 저장
      const workTodoServiceResult = await this.workTodoService.getAllWorkTodos();

      res.status(HttpStatus.OK).send({
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
  async deleteWorkTodo(@Res() res: Response, @Param() params: any) {
    try {
      await this.workTodoService.deleteWorkTodo(params.id);

      res.status(HttpStatus.OK).send({
        message: "할 일이 삭제 되었습니다.",
      });
    } catch (error) {
      const httpStatusCode = getErrorHttpStatusCode(error);
      const message = getErrorMessage(error);

      // API에 에러를 토스
      throw new HttpException(message, httpStatusCode);
    }
  }
}
