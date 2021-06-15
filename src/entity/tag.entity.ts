import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({})
export class Tag {
  constructor(value: string, id?: number) {
    this.value = value;
    if (id) {
      this.id = id;
    }
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
