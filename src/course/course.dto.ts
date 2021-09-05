import { IsArray, IsDate, IsInt, IsNotEmpty, IsString, Length } from "class-validator";

import { CourseType } from "./course.type";

import { Course } from "src/entity/course.entity";
import { Tag } from "src/entity/tag.entity";

import { TagDto } from "src/tag/tag.dto";

export class CourseDto implements CourseType {
  constructor(courseTypeInput?: CourseType) {
    if (courseTypeInput !== undefined) {
      this.color = courseTypeInput.color ?? undefined;
      this.creatorId = courseTypeInput.creatorId ?? undefined;
      this.endDate = courseTypeInput.endDate ?? undefined;
      this.explanation = courseTypeInput.explanation ?? undefined;
      this.id = courseTypeInput.id ?? undefined;
      this.likeCount = courseTypeInput.likeCount ?? undefined;
      this.originalCourseId = courseTypeInput.originalCourseId ?? undefined;
      this.startDate = courseTypeInput.startDate ?? undefined;
      this.tags = courseTypeInput.tags ?? undefined;
      this.title = courseTypeInput.title ?? undefined;
    }
  }

  static entityConstructor(courseEntityInput?: Course, tagEntitiesInput?: Tag[]) {
    const courseDto = new CourseDto();
    courseDto.tags = new Array<TagDto>();

    if (courseEntityInput !== undefined) {
      courseDto.color = courseEntityInput.color?.id ?? undefined;
      courseDto.creatorId = courseEntityInput.creatorId?.id ?? undefined;
      courseDto.endDate = courseEntityInput.endDate ?? undefined;
      courseDto.explanation = courseEntityInput.explanation ?? undefined;
      courseDto.id = courseEntityInput.id ?? undefined;
      courseDto.likeCount = courseEntityInput.likeCount ?? undefined;
      courseDto.originalCourseId = courseEntityInput.originalCourseId?.id ?? undefined;
      courseDto.startDate = courseEntityInput.startDate ?? undefined;
      courseDto.title = courseEntityInput.title ?? undefined;
    }

    // Tag entity 값을 입력 한 경우
    if (tagEntitiesInput !== undefined) {
      for (const tagEntity of tagEntitiesInput) {
        const tagDto = new TagDto(tagEntity);
        courseDto.tags.push(tagDto);
      }
    }

    return courseDto;
  }

  @IsInt({ groups: ["generated"] })
  id: number;

  @IsInt()
  originalCourseId: number;

  @Length(7, 7, { always: true })
  @IsNotEmpty({ always: true })
  color: string;

  @IsInt()
  creatorId: number;

  @IsDate({ groups: ["userUpdate"] })
  startDate: Date;

  @IsDate({ groups: ["userUpdate"] })
  endDate: Date;

  @IsString({ always: true })
  explanation: string;

  @IsString({ always: true })
  @IsNotEmpty({ always: true, message: "title에 해당되는 값이 존재하지 않습니다." })
  title: string;

  @IsInt({ groups: ["userUpdate"] })
  likeCount: number;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  tags: TagDto[];
}
