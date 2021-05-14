import { Controller, Get } from "@nestjs/common";
import { AppService, HelloRes } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): HelloRes {
    return this.appService.getHello();
  }
}
