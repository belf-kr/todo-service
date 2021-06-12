import { Controller, Get, HttpException, HttpStatus } from "@nestjs/common";

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
      const serviceResult: Color[] = await this.colorService.getAllColors();

      // ORM 리턴 값이 비어있는 경우
      if (!serviceResult.length) {
        throw new Error("Call HttpException on catch");
      }

      // 결과값 반환
      const colorResult = Array<string>();

      for (const color of serviceResult) {
        // 해당 객체에서 가져올 스키마의 이름을 key 형식으로 접근
        colorResult.push(color["id"]);
      }

      return Object.assign({
        color_list: colorResult,
      });
    } catch (error) {
      // 동작에 실패한 경우 Catch 구문에 예외를 넘김
      const httpStatusCode = getErrorHttpStatusCode(error);
      const message = getErrorMessage(error);
      throw new HttpException(message, httpStatusCode);
    }
  }
}
