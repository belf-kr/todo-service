import { Controller, Get } from "@nestjs/common";

import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("ping")
  getPing(): void {
    console.log(`Begin controller: ${new Date().toUTCString()}, and ${new Date().getUTCMilliseconds()}ms`);
    return;
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
