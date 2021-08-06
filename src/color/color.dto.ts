import { IsNotEmpty, IsString, Length } from "class-validator";

import { ColorType } from "./color.type";

import { Color } from "src/entity/color.entity";

export class ColorDto implements ColorType {
  static entityConstructor(colorEntity?: Color): Color {
    const colorDto = new ColorDto();

    if (colorEntity.id) {
      colorDto.id = colorEntity.id;
    }

    return colorDto;
  }

  @IsString({ always: true })
  @IsNotEmpty({ always: true })
  @Length(7, 7, { always: true })
  id: string;
}
