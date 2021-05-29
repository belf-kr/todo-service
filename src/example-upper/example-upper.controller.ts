import { Body, Controller, Get, HttpStatus, Post } from "@nestjs/common";
import { HttpException } from "@nestjs/common";
import { exception } from "console";

import { ExampleUpperService } from "./example-upper.service";

import { ExampleUpper } from "src/entity/example-upper.entity";

@Controller("example-upper")
export class ExampleUpperController {
  constructor(private readonly exampleUpperService: ExampleUpperService) {
    this.exampleUpperService = exampleUpperService;
  }
  // 1개 행 Create
  @Post()
  async create(@Body() exampleUpper: ExampleUpper): Promise<string> {
    try {
      await this.exampleUpperService.create(exampleUpper);

      return Object.assign({
        status: HttpStatus.CREATED,
        msg: `create successfully`,
      });
    } catch {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          msg: `create failed`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  //   1개 행 Read
  @Get()
  async read(@Body() exampleUpper: ExampleUpper): Promise<string> {
    try {
      const result = await this.exampleUpperService.read(exampleUpper);

      // Service가 동작 된 경우
      if (result !== undefined) {
        return Object.assign({
          status: HttpStatus.CREATED,
          msg: `read successfully`,
          data: { ...result },
        });
      }
      // 동작에 실패한 경우 Catch 구문에 예외를 넘김
      else {
        throw exception;
      }
    } catch {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `read failed`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
