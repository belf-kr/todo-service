import { Entity, PrimaryColumn } from "typeorm";

@Entity({})
export class Color {
  constructor(id?: string) {
    if (id) {
      this.id = id;
    }
  }

  @PrimaryColumn({
    length: 7,
    type: "char",
  })
  id: string;
}
