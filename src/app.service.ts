import { Injectable } from "@nestjs/common";

import { version } from "../package.json";

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World!";
  }

  getVersion(): string {
    return version;
  }

  getEnv(): NodeJS.ProcessEnv {
    return process.env;
  }
}
