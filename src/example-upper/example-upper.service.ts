import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

import { ExampleUpper } from "src/entity/example-upper.entity";

@Injectable()
export class ExampleUpperService {
  // DB와 연관이 있는 서비스를 사용할 때 DB 접속에 사용될 레포지토리를 생성한다.
  constructor(
    // Repository<ExampleUpper>의 의존성이 주입 된다는 것을 의미한다.
    // DB에서 CRUD를 실행할 때 각 메소드에서 사용한다.
    @InjectRepository(ExampleUpper)
    private exampleUpperRepository: Repository<ExampleUpper>
  ) {}

  // 1개 행 Create
  async create(exampleUpper: ExampleUpper): Promise<boolean> {
    if (this.exampleUpperRepository.save(exampleUpper)) return true;
    else return false;
  }

  // 1개 행 Read
  async read(exampleUpper: ExampleUpper): Promise<ExampleUpper> {
    return this.exampleUpperRepository.findOne(exampleUpper);
  }
}
