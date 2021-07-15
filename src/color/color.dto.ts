import { IsNotEmpty, IsString, Length } from "class-validator";

import { ColorType } from "./color.type";

export class ColorDto implements ColorType {
  @IsString({ always: true })
  @IsNotEmpty({ always: true })
  @Length(7, 7, { always: true })
  id: string;
}
