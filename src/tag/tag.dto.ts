import { IsInt, IsNotEmpty, IsString } from "class-validator";

import { TagType } from "./tag.type";

import { Tag } from "src/entity/tag.entity";

export class TagDto implements TagType {
  static entityConstructor(tag?: Tag): TagDto {
    const tagDto = new TagDto();

    if (tag.id) {
      tagDto.id = tag.id;
    }
    if (tag.value) {
      tagDto.value = tag.value;
    }

    return tagDto;
  }

  @IsInt({
    groups: ["generated"],
  })
  id: number;

  @IsString({ always: true })
  @IsNotEmpty({ always: true })
  value: string;
}
