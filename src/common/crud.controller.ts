import { Body, Delete, Get, HttpException, HttpStatus, Post, Put } from "@nestjs/common";
import { CRUDService } from "./crud.service";

// CRUD의 기본 Controller 폼
// 해당 클래스를 상속하는 클래스에서 동적으로 타입을 지정하기 위해 제너릭을 사용
export class CRUDController<T> {
  // ORM을 통해서 DB 접속에 사용되는 서비스 객체를 제너릭으로 생성
  // 생성자 주입
  constructor(private readonly crudService: CRUDService<T>) {
    this.crudService = crudService;
  }

  // 1개 이상의 행 Create
  @Post()
  async create(@Body() crudEntities: T[]): Promise<HttpStatus> {
    try {
      await this.crudService.create(crudEntities);

      return Object.assign({
        status: HttpStatus.CREATED,
        msg: `create successfully`,
      });
    } catch {
      // 동작에 실패한 경우 Catch 구문에 예외를 넘김
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
  async read(@Body() crudEntities: T[]): Promise<HttpStatus> {
    try {
      // 결과를 받아올 상수 선언
      const result: T[] = await this.crudService.find(crudEntities);

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
    } catch {
      // 동작에 실패한 경우 Catch 구문에 예외를 넘김
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
  // 업데이트를 위해서는 검색 결과에 사용될 엔티티 객체의 배열과, 변경될 객체의 속성 값에 대한 값들을 객체 형태로 넘겨줘야함
  @Put()
  async update(@Body("crudEntitySearchFilters") crudEntitySearchFilters: T[], @Body("crudChangeResult") crudChangeResult: T): Promise<HttpStatus> {
    try {
      await this.crudService.update(crudEntitySearchFilters, crudChangeResult);

      return Object.assign({
        status: HttpStatus.OK,
        msg: `update successfully`,
      });
    } catch {
      // 동작이 실패한 경우 무조껀 catch에서 예외 발생 후 결과를 client 에게 송신
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
  async delete(@Body() crudEntities: T[]): Promise<HttpStatus> {
    try {
      await this.crudService.delete(crudEntities);

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
