import { Body, Delete, Get, HttpException, HttpStatus, Post, Put } from "@nestjs/common";
import { CRUDService } from "./crud.service";

export class CRUDController<T> {
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
  async update(@Body("crudEntitiesearchFilters") crudEntitiesearchFilters: T[], @Body("TChangeResult") TChangeResult: T): Promise<HttpStatus> {
    try {
      await this.crudService.update(crudEntitiesearchFilters, TChangeResult);

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
