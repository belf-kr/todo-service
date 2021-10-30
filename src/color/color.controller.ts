import { Controller, Get, HttpException } from "@nestjs/common";

import { ColorService } from "./color.service";

import { Color } from "src/entity/color.entity";

import { CRUDController } from "src/common/crud.controller";
import { getErrorHttpStatusCode, getErrorMessage } from "src/common/lib/error";

@Controller("colors")
export class ColorController extends CRUDController<Color> {
  constructor(private readonly colorService: ColorService) {
    super(colorService);
  }

  // 색상 리스트 전체 Read
  @Get()
  async getAllColors() {
    let serviceResult: string[];

    try {
      // 서비스 결과 저장
      serviceResult = await this.colorService.getAllColors();
    } catch (error) {
      // 동작에 실패한 경우 Catch 구문에 예외를 넘김
      const httpStatusCode = getErrorHttpStatusCode(error);
      const message = getErrorMessage(error);

      // API에 에러를 토스
      throw new HttpException(message, httpStatusCode);
    }

    return serviceResult;
  }
}
