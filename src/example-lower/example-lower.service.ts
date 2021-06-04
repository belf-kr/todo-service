import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CRUDService } from "src/common/crud.service";
import { ExampleLower } from "src/entity/example-lower.entity";

@Injectable()
export class ExampleLowerService extends CRUDService<ExampleLower> {
  // DB와 연관이 있는 서비스를 사용할 때 DB 접속에 사용될 레포지토리를 생성
  constructor(@InjectRepository(ExampleLower) crudRepository: Repository<ExampleLower>) {
    super(crudRepository);
  }
}
