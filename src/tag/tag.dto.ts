import { IsInt, IsNotEmpty, IsString } from "class-validator";

import { TagType } from "./tag.type";

import { Tag } from "src/entity/tag.entity";

export class TagDto implements TagType {
  constructor(tag?: Tag) {
    if (tag.id) {
      this.id = tag.id;
    }
    if (tag.value) {
      this.value = tag.value;
    }
  }

  @IsInt({
    groups: ["generated"],
  })
  id: number;

  @IsString({ always: true })
  @IsNotEmpty({ always: true })
  value: string;
}
