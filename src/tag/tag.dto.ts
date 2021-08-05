import { IsInt, IsNotEmpty, IsString } from "class-validator";

import { TagType } from "./tag.type";

export class TagDto implements TagType {
  constructor(id?: number, value?: string) {
    this.id = id;
    this.value = value;
  }

  @IsInt({
    groups: ["generated"],
  })
  id: number;

  @IsString({ always: true })
  @IsNotEmpty({ always: true })
  value: string;
}
