import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { ExampleUpper } from "src/entity/example-upper.entity";
import { CRUDService } from "src/common/crud.service";

@Injectable()
// 공통된 CRUDService 클래스를 상속하고, 클래스 상속 후 동적으로 사용할 자료형을 <제너릭>을 사용해 입력
export class ExampleUpperService extends CRUDService<ExampleUpper> {
  // DB와 연관이 있는 서비스를 사용할 때 DB 접속에 사용될 레포지토리를 생성
  // super 키워드를 사용해 부모 클래스의 생성자 호
  constructor(@InjectRepository(ExampleUpper) crudRepository: Repository<ExampleUpper>) {
    super(crudRepository);
  }
}
