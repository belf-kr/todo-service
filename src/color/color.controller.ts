import { Controller, Get, HttpException, HttpStatus, Res } from "@nestjs/common";
import { Response } from "express";

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
  async getAllColors(@Res() res: Response) {
    try {
      // 서비스 결과 저장
      const serviceResult = await this.colorService.getAllColors();

      // 색상 정보가 없는 경우
      // TODO:예외 처리르 서비스로 이관
      if (!serviceResult.length) {
        const message = "색상 정보가 비어있습니다.";

        throw new HttpException({ data: message, status: HttpStatus.ACCEPTED }, HttpStatus.ACCEPTED);
      }

      res.status(HttpStatus.OK).send({
        color_list: serviceResult,
      });
    } catch (error) {
      // 동작에 실패한 경우 Catch 구문에 예외를 넘김
      const httpStatusCode = getErrorHttpStatusCode(error);
      const message = getErrorMessage(error);

      // API에 에러를 토스
      throw new HttpException(message, httpStatusCode);
    }
  }
}
