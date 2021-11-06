import { IsArray, IsNotEmpty, IsString } from "class-validator";

import { CourseDto } from "./course.dto";
import { CoursePostInterface } from "./course-post.interface";

import { TagDto } from "src/tag/tag.dto";

import { Course } from "src/entity/course.entity";
import { Tag } from "src/entity/tag.entity";

export class CoursePostDto extends CourseDto implements CoursePostInterface {
  constructor(coursePostInterfaceInput?: CoursePostInterface) {
    super();

    if (coursePostInterfaceInput) {
      super(coursePostInterfaceInput);

      if (coursePostInterfaceInput.tags) {
        this.tags = coursePostInterfaceInput.tags ?? undefined;
      }
    }
  }

  static entityConstructor(courseEntityInput?: Course, tagEntitiesInput?: Tag[]) {
    const courseDto = super.entityConstructor(courseEntityInput);
    const coursePostDto = new CoursePostDto(courseDto as CoursePostInterface);

    coursePostDto.tags = new Array<TagDto>();
    // Tag entity 값을 입력 한 경우
    if (tagEntitiesInput) {
      for (const tagEntity of tagEntitiesInput) {
        const tagDto = TagDto.entityConstructor(tagEntity);
        coursePostDto.tags.push(tagDto);
      }
    }

    return coursePostDto;
  }

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  tags: TagDto[];
}
