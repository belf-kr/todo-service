import { Injectable } from "@nestjs/common";

export interface HelloRes {
  value1: string;
}

@Injectable()
export class AppService {
  getHello(): HelloRes {
    return {
      value1: "todo-service 1",
    };
  }
}
