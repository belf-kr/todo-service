import { Body, Controller, Post } from "@nestjs/common";

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
    const result: boolean = await this.exampleUpperService.create(exampleUpper);

    if (result === true) {
      return Object.assign({
        statusCode: 201,
        statusMsg: `saved successfully`,
      });
    } else if (result === false) {
      return Object.assign({
        statusCode: 500,
        statusMsg: `saved failed`,
      });
    }
  }
}
