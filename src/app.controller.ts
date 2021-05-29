import { Controller, Get, HttpStatus, Res } from "@nestjs/common";
import { Response } from "express";

import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("ping")
  getPing(@Res() res: Response): void {
    res.sendStatus(HttpStatus.OK);
  }

  @Get("version")
  getVersion(): string {
    return this.appService.getVersion();
  }

  @Get("env")
  getEnv(): NodeJS.ProcessEnv {
    return this.appService.getEnv();
  }
}
