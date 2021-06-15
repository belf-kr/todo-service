import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({})
export class Page {
  constructor(title: string, content: string, id?: number) {
    this.title = title;
    this.content = content;
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
  })
  title: string;

  @Column({
    type: "text",
    charset: "utf8mb4",
  })
  content: string;
}
