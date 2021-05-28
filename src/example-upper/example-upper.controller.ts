import { Body, Controller, Get, Post } from "@nestjs/common";

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
    //   서비스 메소드 정상 동작 여부를 반환
    const result: ExampleUpper = await this.exampleUpperService.create(exampleUpper);

    if (result.id) {
      return Object.assign({
        statusCode: 201,
        statusMsg: `create successfully`,
      });
    } else if (!result.id) {
      return Object.assign({
        statusCode: 500,
        statusMsg: `create failed`,
      });
    }
  }

  //   1개 행 Read
  @Get()
  async read(@Body() exampleUpper: ExampleUpper): Promise<string> {
    //   서비스 메소드 정상 동작 여부를 반환
    const result: ExampleUpper = await this.exampleUpperService.read(exampleUpper);
    if (result.id) {
      return Object.assign({
        statusCode: 201,
        statusMsg: `read successfully`,
        data: { ...result },
      });
    } else if (!result.id) {
      return Object.assign({
        statusCode: 500,
        statusMsg: `read failed`,
      });
    }
  }
}
