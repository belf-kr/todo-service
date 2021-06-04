import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { ExampleUpper } from "src/entity/example-upper.entity";
import { CRUDService } from "src/common/crud.service";

@Injectable()
export class ExampleUpperService extends CRUDService<ExampleUpper> {
  // DB와 연관이 있는 서비스를 사용할 때 DB 접속에 사용될 레포지토리를 생성
  constructor(@InjectRepository(ExampleUpper) crudRepository: Repository<ExampleUpper>) {
    super(crudRepository);
  }
}
