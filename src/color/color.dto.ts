import { IsNotEmpty, IsString, Length } from "class-validator";

import { ColorType } from "./color.type";

import { Color } from "src/entity/color.entity";

export class ColorDto implements ColorType {
  constructor(colorTypeInput?: ColorType) {
    // 입력값이 없는 단순 객체 생성 용도인지 판별
    if (colorTypeInput !== undefined) {
      if (colorTypeInput.id !== undefined) {
        this.id = colorTypeInput.id;
      }
    }
  }

  static entityConstructor(colorEntityInput?: Color) {
    const colorDto = new ColorDto();

    if (colorEntityInput.id !== undefined) {
      colorDto.id = colorEntityInput.id;
    }

    return colorDto;
  }

  @IsString({ always: true })
  @IsNotEmpty({ always: true })
  @Length(7, 7, { always: true })
  id: string;
}
