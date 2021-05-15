import { Entity, PrimaryColumn } from "typeorm";

@Entity({})
export class Color {
  @PrimaryColumn({
    length: 7,
    type: "char",
  })
  id: string;
}
