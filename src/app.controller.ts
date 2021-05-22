import { Controller, Get, HttpStatus, Res } from "@nestjs/common";
import { Response } from "express";
import { AppService } from "./app.service";
import { version } from "../package.json";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("ping")
  ping(@Res() res: Response) {
    res.sendStatus(HttpStatus.OK);
  }

  @Get("version")
  version() {
    return version;
  }

  @Get("env")
  getEnv() {
    return process.env;
  }
}
