import { IsArray, IsDate, IsInt, IsNotEmpty, IsString, Length } from "class-validator";

import { CourseType } from "./course.type";

import { Course } from "src/entity/course.entity";
import { Tag } from "src/entity/tag.entity";

import { TagDto } from "src/tag/tag.dto";

export class CourseDto implements CourseType {
  static entityConstructor(courseEntity?: Course, tagEntities?: Tag[]) {
    const courseDto = new CourseDto();

    courseDto.tags = new Array<TagDto>();

    if (courseEntity.id !== undefined) {
      courseDto.id = courseEntity.id;
    }
    if (
      courseEntity.originalCourseId !== undefined &&
      courseEntity.originalCourseId !== null &&
      courseEntity.originalCourseId.id !== undefined &&
      courseEntity.originalCourseId.id !== null
    ) {
      courseDto.originalCourseId = courseEntity.originalCourseId.id;
    }
    if (courseEntity.color !== undefined && courseEntity.color !== null && courseEntity.color.id !== undefined && courseEntity.color.id !== null) {
      courseDto.color = courseEntity.color.id;
    }
    if (
      courseEntity.creatorId !== undefined &&
      courseEntity.creatorId !== null &&
      courseEntity.creatorId.id !== undefined &&
      courseEntity.creatorId.id !== null
    ) {
      courseDto.creatorId = courseEntity.creatorId.id;
    }
    if (courseEntity.startDate !== undefined) {
      courseDto.startDate = courseEntity.startDate;
    }
    if (courseEntity.endDate !== undefined) {
      courseDto.endDate = courseEntity.endDate;
    }
    if (courseEntity.explanation !== undefined) {
      courseDto.explanation = courseEntity.explanation;
    }
    if (courseEntity.title !== undefined) {
      courseDto.title = courseEntity.title;
    }
    if (courseEntity.likeCount !== undefined) {
      courseDto.likeCount = courseEntity.likeCount;
    }

    // Tag entity 값을 입력 한 경우
    if (tagEntities) {
      for (const tagEntity of tagEntities) {
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
