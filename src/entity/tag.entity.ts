import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({})
export class Tag {
  constructor(id?: number, value?: string) {
    if (id) {
      this.id = id;
    }
    if (value) {
      this.value = value;
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
