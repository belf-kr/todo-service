import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { ExampleUpper } from "src/entity/example-upper.entity";

@Injectable()
export class ExampleUpperService {
  // DB와 연관이 있는 서비스를 사용할 때 DB 접속에 사용될 레포지토리를 생성
  constructor(
    // Repository<ExampleUpper>의 의존성이 주입 된다는 것을 의미
    // DB에서 CRUD를 실행할 때 각 메소드에서 사용
    @InjectRepository(ExampleUpper)
    private exampleUpperRepository: Repository<ExampleUpper>
  ) {}

  // 1개 이상의 행 Create
  async create(exampleUppers: ExampleUpper[]): Promise<void> {
    await this.exampleUpperRepository.save(exampleUppers);
  }

  // 1개 행 Read
  async findOne(exampleUpper: ExampleUpper): Promise<ExampleUpper> {
    // 컬럼명 및 컬럼에 해당되는 데이터에 오류가 있는 경우 예외가 발생
    return this.exampleUpperRepository.findOneOrFail(exampleUpper);
  }

  // 1개 이상의 행 Read
  async find(exampleUppers: ExampleUpper[]): Promise<ExampleUpper[]> {
    return await this.exampleUpperRepository.find({ where: exampleUppers });
  }

  // 1개 행 이상 Update
  async update(exampleUpperSearchFilters: ExampleUpper[], exampleUpperChangeResult: ExampleUpper): Promise<void> {
    // 컬럼명 및 컬럼에 해당되는 데이터에 오류가 있는 경우 예외가 발생
    const findResult = await this.find(exampleUpperSearchFilters);
    const findResultIDs = [];

    // ID 값들을 가져와 배열에 저장하기
    for (const item of findResult) {
      findResultIDs.push(item["id"]);
    }

    await this.exampleUpperRepository.update(findResultIDs, exampleUpperChangeResult);
  }

  // 1개 이상의 행 Delete
  async delete(exampleUppers: ExampleUpper[]): Promise<void> {
    // 컬럼명 및 컬럼에 해당되는 데이터에 오류가 있는 경우 예외가 발생
    // if ((await this.find(exampleUppers)).length == 0) throw "질의 결과를 만족하지 못 했으므로 HTTP 예외를 Controller 에서 만듭니다.";
    // 조건을 만족하는 데이터가 존재하는지 확인
    const findResult = await this.find(exampleUppers);

    if (findResult.length === 0) {
      throw "질의 결과를 만족하지 못 했으므로 HTTP 예외를 발생한다.";
    }
    await this.exampleUpperRepository.remove(findResult);
  }
}
