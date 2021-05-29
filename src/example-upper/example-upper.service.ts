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

  // 1개 행 Create
  async createOne(exampleUpper: ExampleUpper): Promise<void> {
    await this.exampleUpperRepository.save(exampleUpper);
  }

  // 1개 행 Read
  async findOne(exampleUpper: ExampleUpper): Promise<ExampleUpper> {
    // 컬럼명 및 컬럼에 해당되는 데이터에 오류가 있는 경우 예외가 발생
    return this.exampleUpperRepository.findOneOrFail(exampleUpper);
  }

  async find(exampleUppers: ExampleUpper[]): Promise<ExampleUpper[]> {
    return await this.exampleUpperRepository.find({ where: exampleUppers });
  }

  // 1개 행 Update
  async updateOne(exampleUpper: ExampleUpper): Promise<void> {
    // 컬럼명 및 컬럼에 해당되는 데이터에 오류가 있는 경우 예외가 발생
    await this.findOne(exampleUpper);
    await this.exampleUpperRepository.update(exampleUpper.id, exampleUpper);
  }

  // 1개 행 Delete
  async deleteOne(exampleUpper: ExampleUpper): Promise<void> {
    // 컬럼명 및 컬럼에 해당되는 데이터에 오류가 있는 경우 예외가 발생
    await this.findOne(exampleUpper);
    await this.exampleUpperRepository.delete(exampleUpper);
  }
}
