import { Entity, PrimaryColumn } from "typeorm";

@Entity({})
export class Color {
  static colorConstructor(id?: string): Color {
    const colorEntity = new Color();

    if (id) {
      colorEntity.id = id;
    }

    return colorEntity;
  }

  @PrimaryColumn({
    length: 7,
    type: "char",
  })
  id: string;
}
