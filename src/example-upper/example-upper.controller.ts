import { Body, Controller, Delete, Get, HttpStatus, Post, Put } from "@nestjs/common";
import { HttpException } from "@nestjs/common";

import { ExampleUpperService } from "./example-upper.service";

import { ExampleUpper } from "src/entity/example-upper.entity";

@Controller("example-upper")
export class ExampleUpperController {
  constructor(private readonly exampleUpperService: ExampleUpperService) {
    this.exampleUpperService = exampleUpperService;
  }
  // 1개 이상의 행 Create
  @Post()
  async create(@Body() exampleUppers: ExampleUpper[]): Promise<HttpStatus> {
    try {
      await this.exampleUpperService.create(exampleUppers);

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

  // 1개 이상의 행 Read
  @Get()
  async read(@Body() exampleUppers: ExampleUpper[]): Promise<HttpStatus> {
    try {
      // 결과를 받아올 상수 선언
      const result: ExampleUpper[] = await this.exampleUpperService.find(exampleUppers);

      // ORM 리턴 값이 비어있는 경우
      if (!result.length) {
        throw new Error("Call HttpException on catch");
      }

      // Service가 동작 된 경우 결과값을 반환
      return Object.assign({
        status: HttpStatus.OK,
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
  async update(
    @Body("exampleUpperSearchFilters") exampleUpperSearchFilters: ExampleUpper[],
    @Body("exampleUpperChangeResult") exampleUpperChangeResult: ExampleUpper
  ): Promise<HttpStatus> {
    try {
      await this.exampleUpperService.update(exampleUpperSearchFilters, exampleUpperChangeResult);

      return Object.assign({
        status: HttpStatus.OK,
        msg: `update successfully`,
      });
    } catch {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `update failed`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // 1개 행 Delete
  @Delete()
  async delete(@Body() exampleUppers: ExampleUpper[]): Promise<HttpStatus> {
    try {
      await this.exampleUpperService.delete(exampleUppers);

      return Object.assign({
        status: HttpStatus.OK,
        msg: `delete successfully`,
      });
    } catch {
      // 동작이 실패한 경우 무조껀 catch에서 예외 발생 후 결과를 client 에게 송신
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
