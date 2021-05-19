import { Injectable } from "@nestjs/common";
import { InjectConnection } from "@nestjs/typeorm";
import { Connection } from "typeorm";

export interface HelloRes {
  value1: string;
}

@Injectable()
export class AppService {
  constructor(
    @InjectConnection("connectionType")
    private connection: Connection
  ) {}
  getHello(): HelloRes {
    return {
      value1: "승업이가 수정",
    };
  }
}
