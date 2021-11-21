import { Body, HttpException, HttpStatus } from "@nestjs/common";

import { CRUDService } from "./crud.service";

import { getErrorHttpStatusCode, getErrorMessage } from "./lib/error";

// CRUD의 기본 Controller 폼
// 해당 클래스를 상속하는 클래스에서 동적으로 타입을 지정하기 위해 제너릭을 사용
export class CRUDController<T> {
  // ORM을 통해서 DB 접속에 사용되는 서비스 객체를 제너릭으로 생성
  // 생성자 주입
  constructor(private readonly crudService: CRUDService<T>) {
    this.crudService = crudService;
  }

  // 1개 이상의 행 Create
  async create(@Body() crudEntities: T[]): Promise<HttpStatus> {
    try {
      await this.crudService.create(crudEntities);
    } catch (error) {
      // 동작에 실패한 경우 Catch 구문에 예외를 넘김
      const httpStatusCode = getErrorHttpStatusCode(error);
      const message = getErrorMessage(error);

      throw new HttpException(message, httpStatusCode);
    }

    return Object.assign({
      status: HttpStatus.CREATED,
      msg: `create successfully`,
    });
  }

  // 1개 이상의 행 Read
  async read(@Body() crudEntities: T[]): Promise<HttpStatus> {
    let result: T[];

    try {
      // 결과를 받아올 상수 선언
      result = await this.crudService.find(crudEntities);

      // ORM 리턴 값이 비어있는 경우
      if (!result.length) {
        throw new Error("Call HttpException on catch");
      }
    } catch (error) {
      // 동작에 실패한 경우 Catch 구문에 예외를 넘김
      const httpStatusCode = getErrorHttpStatusCode(error);
      const message = getErrorMessage(error);

      throw new HttpException(message, httpStatusCode);
    }

    // Service가 동작 된 경우 결과값을 반환
    return Object.assign({
      status: HttpStatus.OK,
      msg: `read successfully`,
      data: { ...result },
    });
  }

  // 1개 이상의 행 Update
  // 업데이트를 위해서는 검색 결과에 사용될 엔티티 객체의 배열과, 변경될 객체의 속성 값에 대한 값들을 객체 형태로 넘겨줘야함
  async update(@Body("crudEntitySearchFilters") crudEntitySearchFilters: T[], @Body("crudChangeResult") crudChangeResult: T): Promise<HttpStatus> {
    try {
      await this.crudService.update(crudEntitySearchFilters, crudChangeResult);
    } catch (error) {
      // 동작에 실패한 경우 Catch 구문에 예외를 넘김
      const httpStatusCode = getErrorHttpStatusCode(error);
      const message = getErrorMessage(error);

      throw new HttpException(message, httpStatusCode);
    }

    return Object.assign({
      status: HttpStatus.OK,
      msg: `update successfully`,
    });
  }

  // 1개 이상의 행 Delete
  async delete(@Body() crudEntities: T[]): Promise<HttpStatus> {
    try {
      await this.crudService.delete(crudEntities);
    } catch (error) {
      // 동작에 실패한 경우 Catch 구문에 예외를 넘김
      const httpStatusCode = getErrorHttpStatusCode(error);
      const message = getErrorMessage(error);

      throw new HttpException(message, httpStatusCode);
    }

    return Object.assign({
      status: HttpStatus.OK,
      msg: `delete successfully`,
    });
  }
}
