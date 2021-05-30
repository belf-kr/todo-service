import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { ExampleLower } from "src/entity/example-lower.entity";

@Injectable()
export class ExampleLowerService {
  // DB와 연관이 있는 서비스를 사용할 때 DB 접속에 사용될 레포지토리를 생성
  constructor(
    // Repository<ExampleLower>의 의존성이 주입 된다는 것을 의미
    // DB에서 CRUD를 실행할 때 각 메소드에서 사용
    @InjectRepository(ExampleLower)
    private exampleLowerRepository: Repository<ExampleLower>
  ) {}

  // 1개 행 Read
  async findOne(exampleLower: ExampleLower): Promise<ExampleLower> {
    // 컬럼명 및 컬럼에 해당되는 데이터에 오류가 있는 경우 예외가 발생
    return this.exampleLowerRepository.findOneOrFail(exampleLower);
  }

  // 1개 이상의 행 Read
  async find(exampleLowers: ExampleLower[]): Promise<ExampleLower[]> {
    return await this.exampleLowerRepository.find({ where: exampleLowers });
  }

  // 1개 이상의 행 Delete
  async delete(exampleLowers: ExampleLower[]): Promise<void> {
    // 컬럼명 및 컬럼에 해당되는 데이터에 오류가 있는 경우 예외가 발생
    // if ((await this.find(exampleUppers)).length == 0) throw "질의 결과를 만족하지 못 했으므로 HTTP 예외를 Controller 에서 만듭니다.";
    // 조건을 만족하는 데이터가 존재하는지 확인
    const findResult = await this.find(exampleLowers);

    if (findResult.length === 0) {
      throw "질의 결과를 만족하지 못 했으므로 HTTP 예외를 발생한다.";
    }
    await this.exampleLowerRepository.remove(findResult);
  }
}
