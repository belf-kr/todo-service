import { Body, Controller, Delete, Get, HttpStatus, Post, Put } from "@nestjs/common";
import { HttpException } from "@nestjs/common";

import { ExampleUpperService } from "./example-upper.service";

import { ExampleUpper } from "src/entity/example-upper.entity";

@Controller("example-upper")
export class ExampleUpperController {
  constructor(private readonly exampleUpperService: ExampleUpperService) {
    this.exampleUpperService = exampleUpperService;
  }
  // 1개 행 Create
  @Post()
  async create(@Body() exampleUpper: ExampleUpper): Promise<HttpStatus> {
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

  // 1개 행 Read
  @Get()
  async read(@Body() exampleUpper: ExampleUpper): Promise<HttpStatus> {
    try {
      const result = await this.exampleUpperService.read(exampleUpper);

      // Service가 동작 된 경우
      return Object.assign({
        status: HttpStatus.CREATED,
        msg: `read successfully`,
        data: { ...result },
      });
      // 동작에 실패한 경우 Catch 구문에 예외를 넘김
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

  // 1개 행 Update
  @Put()
  async update(@Body() exampleUpper: ExampleUpper): Promise<HttpStatus> {
    try {
      await this.exampleUpperService.update(exampleUpper);

      return Object.assign({
        status: HttpStatus.OK,
        msg: `update successfully`,
      });
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

  // 1개 행 Delete
  @Delete()
  async delete(@Body() exampleUpper: ExampleUpper): Promise<HttpStatus> {
    try {
      await this.exampleUpperService.delete(exampleUpper);

      return Object.assign({
        status: HttpStatus.OK,
        msg: `delete successfully`,
      });
    } catch {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `delete failed`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
