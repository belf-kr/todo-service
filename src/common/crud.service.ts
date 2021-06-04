import { Repository } from "typeorm";

// 상속받는 클래스에서 입력 해 줄 타입을 제너릭 기호 T로 나타낸다.
export class CRUDService<T> {
  // DB와 연관이 있는 서비스를 사용할 때 DB 접속에 사용될 레포지토리를 생성
  constructor(
    // DB에서 CRUD를 실행할 때 각 메소드에서 사용
    private crudRepository: Repository<T>
  ) {}

  // 1개 이상의 행 Create
  async create(crudEntities: T[]): Promise<void> {
    await this.crudRepository.save(crudEntities);
  }

  // 1개 행 Read
  async findOne(crudEntity: T): Promise<T> {
    // 컬럼명 및 컬럼에 해당되는 데이터에 오류가 있는 경우 예외가 발생
    return this.crudRepository.findOneOrFail(crudEntity);
  }

  // 1개 이상의 행 Read
  async find(crudEntities: T[]): Promise<T[]> {
    return await this.crudRepository.find({ where: crudEntities });
  }

  // 1개 행 이상 Update
  async update(crudEntitySearchFilters: T[], crudEntityChangeResult: T): Promise<void> {
    // 컬럼명 및 컬럼에 해당되는 데이터에 오류가 있는 경우 예외가 발생
    const findResult = await this.find(crudEntitySearchFilters);
    const findResultIDs = [];

    // ID 값들을 가져와 배열에 저장하기
    for (const item of findResult) {
      findResultIDs.push(item["id"]);
    }

    await this.crudRepository.update(findResultIDs, crudEntityChangeResult);
  }

  // 1개 이상의 행 Delete
  async delete(crudEntities: T[]): Promise<void> {
    // 컬럼명 및 컬럼에 해당되는 데이터에 오류가 있는 경우 예외가 발생
    // if ((await this.find(crudRepositorys)).length == 0) throw "질의 결과를 만족하지 못 했으므로 HTTP 예외를 Controller 에서 만듭니다.";
    // 조건을 만족하는 데이터가 존재하는지 확인
    const findResult = await this.find(crudEntities);

    if (findResult.length === 0) {
      throw "질의 결과를 만족하지 못 했으므로 HTTP 예외를 발생한다.";
    }
    await this.crudRepository.remove(findResult);
  }
}
