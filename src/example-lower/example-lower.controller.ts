import { Body, Controller, Delete, Get, HttpException, HttpStatus, Post, Put } from "@nestjs/common";

import { ExampleLowerService } from "./example-lower.service";

import { ExampleLower } from "src/entity/example-lower.entity";

@Controller("example-lower")
export class ExampleLowerController {
  // 비즈니스 로직 처리를 담당하는 서비스를 컨트롤러 생성 시 생성
  constructor(private readonly exampleLowerService: ExampleLowerService) {
    this.exampleLowerService = exampleLowerService;
  }

  // CRUD 컨트롤러는 공동된 반환 형식을 가지고 있음
  // 서비스 코드에서 예외가 나거나, 컨트롤러에서 예외가 난 경우 전부 HTTP 예외와 해당 HTTP 응답 코드 값을 반환하는 형식
  // 1개의 CRUD 컨트롤러에서 단일 개수, 여러 개수의 객체를 처리하기 위해 배열 형식으로 JSON 입력을 받음

  // 1개 이상의 행 Create
  @Post()
  async create(@Body() exampleLowers: ExampleLower[]): Promise<HttpStatus> {
    try {
      await this.exampleLowerService.create(exampleLowers);

      return Object.assign({
        status: HttpStatus.CREATED,
        msg: `create successfully`,
      });
      // Insert 중 예외가 발생한 경우
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
  async read(@Body() exampleLowers: ExampleLower[]): Promise<HttpStatus> {
    try {
      // 결과를 받아올 상수 선언
      const result: ExampleLower[] = await this.exampleLowerService.find(exampleLowers);

      // ORM 리턴 값이 비어있는 경우 예외가 발생하지 않기 때문에 직접 catch 구문으로 예외를 생성해 실행 컨텍스트를 이동 해야함
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

  // 1개 이상의 행 Update
  @Put()
  async update(
    // 검색을 할 조건
    @Body("exampleLowerSearchFilters") exampleLowerSearchFilters: ExampleLower[],
    // 검색된 행들이 변경되길 원하는 값
    @Body("exampleLowerChangeResult") exampleLowerChangeResult: ExampleLower
  ): Promise<HttpStatus> {
    try {
      await this.exampleLowerService.update(exampleLowerSearchFilters, exampleLowerChangeResult);

      return Object.assign({
        status: HttpStatus.OK,
        msg: `update successfully`,
      });
      // 예외가 발생한 경우
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

  // 1개 이상의 행 Delete
  @Delete()
  async delete(@Body() exampleLowers: ExampleLower[]): Promise<HttpStatus> {
    try {
      await this.exampleLowerService.delete(exampleLowers);

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
