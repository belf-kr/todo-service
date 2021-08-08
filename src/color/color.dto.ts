import { IsNotEmpty, IsString, Length } from "class-validator";

import { ColorType } from "./color.type";

import { Color } from "src/entity/color.entity";

export class ColorDto implements ColorType {
  constructor(colorEntity?: Color) {
    if (colorEntity.id && colorEntity.id !== undefined) {
      this.id = colorEntity.id;
    }
  }

  @IsString({ always: true })
  @IsNotEmpty({ always: true })
  @Length(7, 7, { always: true })
  id: string;
}
