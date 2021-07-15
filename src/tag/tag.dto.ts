import { IsInt, IsNotEmpty, IsString } from "class-validator";

import { TagType } from "./tag.type";

export class TagDto implements TagType {
  @IsInt({
    groups: ["generated"],
  })
  id: number;

  @IsString({ always: true })
  @IsNotEmpty({ always: true })
  value: string;
}
