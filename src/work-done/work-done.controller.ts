import { Body, Controller, HttpException, Post, ValidationPipe } from "@nestjs/common";

import { WorkDoneDto } from "./work-done.dto";
import { WorkDoneService } from "./work-done.service";

import { getErrorHttpStatusCode, getErrorMessage } from "src/common/lib/error";

@Controller("work-dones")
export class WorkDoneController {
  constructor(private readonly workDoneService: WorkDoneService) {}

  @Post()
  async createWorkDone(@Body(new ValidationPipe({ groups: ["userInput"] })) workDoneInput: WorkDoneDto) {
    try {
      await this.workDoneService.createWorkDone(workDoneInput);

      return;
    } catch (error) {
      // API에 에러를 토스
      const httpStatusCode = getErrorHttpStatusCode(error);
      const message = getErrorMessage(error);

      throw new HttpException(message, httpStatusCode);
    }
  }
}
