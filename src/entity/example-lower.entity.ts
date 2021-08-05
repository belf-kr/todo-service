import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { ExampleUpper } from "./example-upper.entity";

@Entity({})
export class ExampleLower {
  // 기본 생성되는 컬럼으로, 숫자값이 자동 증가됨
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
    unique: true,
  })
  name: string;

  // FK를 가지는 테이블은 기본적으로 N차(N:1) 관계임
  // N차 쪽 관계에서(FK를 가지는 테이블에서) 어느 테이블을 FK로 가질지 명시(일반적으론 @ManyToOne 사용) 해야 함
  // 1차 관계쪽 테이블에서도 @OneToMany 데코레이터를 사용할 수 있지만, 의무사항이 아니라 사용하지 않음.
  // 1:1 관계에 해당되는 데코레이터는 @OneToOne
  @ManyToOne(() => ExampleUpper, (exampleUpper) => exampleUpper.id, {
    // FK의 실제 데이터가 삭제 될 경우 어떻게 할 것인가를 의미하며, 예제는 연쇄적으로 이 테이블의 해당 행도 삭제하는 CASCADE 사용
    onDelete: "CASCADE",
    // FK 컬럼에 해당되는 데이터를 JSON 객체 내 JSON 형식으로 가져오기 위한 옵션, Join 문제를 이것으로 해결했음
    eager: true,
  })
  @JoinColumn({
    // FK 컬럼명
    name: "example_upper_id",
  })
  exampleUpperId: ExampleUpper;
}
