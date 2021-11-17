import { Body, Controller, Get, HttpException, Param, ParseIntPipe, Post, Query, ValidationPipe } from "@nestjs/common";

import { WorkDoneDto } from "./work-done.dto";
import { WorkDoneService } from "./work-done.service";
import { WorkDoneQuerystringDto } from "./work-done-querystring.dto";

import { getErrorHttpStatusCode, getErrorMessage } from "src/common/lib/error";

@Controller("work-dones")
export class WorkDoneController {
  constructor(private readonly workDoneService: WorkDoneService) {}

  @Post()
  async createWorkDone(@Body(new ValidationPipe({ groups: ["userInput"] })) workDoneInput: WorkDoneDto) {
    try {
      await this.workDoneService.createWorkDone(workDoneInput);
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
  async getWorkTodosByConditions(@Query("userId") userId: number, @Query("courseId") courseId?: number) {
    let serviceResult: WorkDoneDto[];

    try {
      const querystringInput = new WorkDoneQuerystringDto(userId, courseId);

      // 할일 리스트 저장
      serviceResult = await this.workDoneService.getWorkDonesByConditions(querystringInput);
    } catch (error) {
      const httpStatusCode = getErrorHttpStatusCode(error);
      const message = getErrorMessage(error);

      // API에 에러를 토스
      throw new HttpException(message, httpStatusCode);
    }

    return serviceResult;
  }

  @Get(":id")
  async getWorkDone(@Param("id", ParseIntPipe) id: number) {
    let serviceResult: WorkDoneDto;

    try {
      serviceResult = await this.workDoneService.getWorkDone(id);
    } catch (error) {
      const httpStatusCode = getErrorHttpStatusCode(error);
      const message = getErrorMessage(error);

      // API에 에러를 토스
      throw new HttpException(message, httpStatusCode);
    }

    return serviceResult;
  }
}
