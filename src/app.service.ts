import { Injectable } from "@nestjs/common";

import { name, version } from "../package.json";

@Injectable()
export class AppService {
  getHello(): string {
    return name;
  }

  getVersion(): string {
    return version;
  }

  getEnv(): NodeJS.ProcessEnv {
    return process.env;
  }
}
