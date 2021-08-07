import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({})
export class Tag {
  static tagConstructor(id?: number, value?: string): Tag {
    const tagEntity = new Tag();

    if (id) {
      tagEntity.id = id;
    }
    if (value) {
      tagEntity.value = value;
    }

    return tagEntity;
  }

  @PrimaryGeneratedColumn({})
  id: number;

  @Column({
    length: 50,
    type: "nvarchar",
    charset: "utf8mb4",
    unique: true,
  })
  value: string;
}
