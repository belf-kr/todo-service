import { CourseDto } from "./course.dto";
import { CourseGetInterface } from "./course-get.interface";

import { TagDto } from "src/tag/tag.dto";

import { Course } from "src/entity/course.entity";
import { Tag } from "src/entity/tag.entity";

export class CourseGetDto extends CourseDto implements CourseGetInterface {
  constructor(courseGetInterfaceInput?: CourseGetInterface) {
    super(courseGetInterfaceInput);

    if (courseGetInterfaceInput) {
      if (courseGetInterfaceInput.tags) {
        this.tags = courseGetInterfaceInput.tags ?? undefined;
      }
    }
  }

  static entityConstructor(courseEntityInput?: Course, tagEntitiesInput?: Tag[]) {
    const courseDto = super.entityConstructor(courseEntityInput);
    const courseGetDto = new CourseGetDto(courseDto as CourseGetInterface);

    courseGetDto.tags = new Array<TagDto>();
    // Tag entity 값을 입력 한 경우
    if (tagEntitiesInput) {
      for (const tagEntity of tagEntitiesInput) {
        const tagDto = new TagDto(tagEntity);
        courseGetDto.tags.push(tagDto);
      }
    }

    return courseGetDto;
  }

  tags: TagDto[];
}
