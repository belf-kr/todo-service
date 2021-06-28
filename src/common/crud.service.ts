import { Repository } from "typeorm";

// 상속받는 클래스에서 엔티티의 타입을 입력 할 때 제너릭을 사용
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
  // DB에서 해당되는 행들을 찾을 검색 조건을 배열로, 검색된 행들을 변환해 줄 객체의 상태를 T자료형 객체로 받아옴
  async update(crudEntitySearchFilters: T[], crudEntityChangeResult: T): Promise<void> {
    // 컬럼명 및 컬럼에 해당되는 데이터에 오류가 있는 경우 예외가 발생
    const findResult = await this.find(crudEntitySearchFilters);
    const findResultIds = [];

    // Id 값들을 가져와 배열에 저장하기
    for (const item of findResult) {
      findResultIds.push(item["id"]);
    }

    await this.crudRepository.update(findResultIds, crudEntityChangeResult);
  }

  // 1개 이상의 행 Delete
  async delete(crudEntities: T[]): Promise<void> {
    // 조건을 만족하는 데이터가 존재하는지 확인
    // 컬럼명 및 컬럼에 해당되는 데이터에 오류가 있는 경우 예외가 발생
    // if ((await this.find(crudRepositorys)).length == 0) throw "질의 결과를 만족하지 못 했으므로 HTTP 예외를 Controller 에서 만듭니다.";
    const findResult = await this.find(crudEntities);

    if (findResult.length === 0) {
      throw new Error("질의 결과를 만족하지 못했습니다.");
    }
    await this.crudRepository.remove(findResult);
  }
}
