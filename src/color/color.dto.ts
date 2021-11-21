import { IsNotEmpty, IsString, Length } from "class-validator";

import { ColorType } from "./color.type";

import { Color } from "src/entity/color.entity";

export class ColorDto implements ColorType {
  constructor(colorTypeInput?: ColorType) {
    this.id = colorTypeInput?.id ?? undefined;
  }

  static entityConstructor(colorEntityInput?: Color) {
    const colorDto = new ColorDto();

    colorDto.id = colorEntityInput.id ?? undefined;

    return colorDto;
  }

  @IsString({ always: true })
  @IsNotEmpty({ always: true })
  @Length(7, 7, { always: true })
  id: string;
}
