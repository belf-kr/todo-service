import { IsInt, IsNotEmpty, IsString } from "class-validator";

import { TagType } from "./tag.type";

import { Tag } from "src/entity/tag.entity";

export class TagDto implements TagType {
  constructor(tagTypeInput?: TagType) {
    if (tagTypeInput !== undefined) {
      this.id = tagTypeInput.id ?? undefined;
      this.value = tagTypeInput.value ?? undefined;
    }
  }

  static entityConstructor(tagEntityInput?: Tag) {
    const tagDto = new TagDto();
    tagDto.id = tagEntityInput.id ?? undefined;
    tagDto.value = tagEntityInput.value ?? undefined;

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
