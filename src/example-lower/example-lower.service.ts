import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CRUDService } from "src/common/crud.service";
import { ExampleLower } from "src/entity/example-lower.entity";

@Injectable()
// 공통된 CRUDService 클래스를 상속하고, 클래스 상속 후 동적으로 사용할 자료형을 <제너릭>을 사용해 입력
export class ExampleLowerService extends CRUDService<ExampleLower> {
  // DB와 연관이 있는 서비스를 사용할 때 DB 접속에 사용될 레포지토리를 생성
  // super 키워드를 사용해 부모 클래스의 생성자 호출
  constructor(@InjectRepository(ExampleLower) crudRepository: Repository<ExampleLower>) {
    super(crudRepository);
  }
}
