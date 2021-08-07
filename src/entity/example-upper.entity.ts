import { Column, CreateDateColumn, Double, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({
  name: "example_upper",
})
export class ExampleUpper {
  static exampleUpperConstructor(
    id?: number,
    creationDate?: Date,
    updateDate?: Date,
    title?: string,
    content?: string,
    defaultDouble?: Double,
    nullableInt?: number
  ): ExampleUpper {
    const exampleUpperEntity = new ExampleUpper();

    if (id) {
      exampleUpperEntity.id = id;
    }
    if (creationDate) {
      exampleUpperEntity.creationDate = creationDate;
    }
    if (updateDate) {
      exampleUpperEntity.updateDate = updateDate;
    }
    if (title) {
      exampleUpperEntity.title = title;
    }
    if (content) {
      exampleUpperEntity.content;
    }
    if (defaultDouble) {
      exampleUpperEntity.defaultDouble;
    }
    if (nullableInt) {
      exampleUpperEntity.nullableInt = nullableInt;
    }

    return exampleUpperEntity;
  }

  // 기본적으로 생성되는 컬럼으로, 숫자값이 자동 증가됨
  @PrimaryGeneratedColumn()
  id: number;

  // Insert 될 때의 시간을 자동 입력
  @CreateDateColumn({
    type: "datetime",
    name: "creation_date",
    comment: "행이 생성될 때 해당 날짜와 시간을 자동 입력합니다.",
  })
  creationDate: Date;

  // 해당 행에 Update가 발생할 때의 시간을 자동 입력
  @UpdateDateColumn({
    type: "datetime",
    name: "update_date",
    comment: "행이 업데이트 될 때 마다 해당 날짜와 시간을 자동 입력합니다.",
  })
  updateDate: Date;

  @Column({
    length: 100,
    type: "nvarchar",
    charset: "utf8mb4",
  })
  title: string;

  @Column({
    type: "text",
    charset: "utf8",
    collation: "utf8_unicode_ci",
    comment: "특정 컬럼의 charset, collection을 변경 할 수 있는 방법을 보여주기 위한 예제입니다.",
  })
  content: string;

  @Column({
    type: "double",
    default: 50.0,
    name: "default_double",
    comment: "기본값이 50.0이 들어가는 컬럼입니다.",
  })
  defaultDouble: Double;

  @Column({
    type: "int",
    nullable: true,
    name: "nullable_int",
    comment: "null값이 허용되는 컬럼입니다.",
  })
  nullableInt: number;
}
