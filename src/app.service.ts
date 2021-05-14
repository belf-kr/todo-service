import { Injectable } from "@nestjs/common";

export interface HelloRes {
  value1: string;
}

@Injectable()
export class AppService {
  getHello(): HelloRes {
    return {
      value1: "QA에서만 확인",
    };
  }
}
