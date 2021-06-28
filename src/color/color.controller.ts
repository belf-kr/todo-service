import { Controller, Get, HttpStatus } from "@nestjs/common";

import { ColorService } from "./color.service";

import { Color } from "src/entity/color.entity";

import { CRUDController } from "src/common/crud.controller";
import { getErrorHttpStatusCode, getErrorMessage } from "src/common/lib/error";

@Controller("color")
export class ColorController extends CRUDController<Color> {
  constructor(private readonly colorService: ColorService) {
    super(colorService);
  }

  // 색상 리스트 전체 Read
  @Get("get-all-colors")
  async getAllColors(): Promise<HttpStatus> {
    try {
      // 서비스 결과 저장
      const serviceResult = await this.colorService.getAllColors();

      // 색상 정보가 없는 경우
      if (!serviceResult.length) {
        throw new Error("색상 정보가 비어있습니다.");
      }

      return Object.assign({
        color_list: serviceResult,
      });
    } catch (error) {
      // 동작에 실패한 경우 Catch 구문에 예외를 넘김
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
