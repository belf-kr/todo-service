import { IsArray, IsDate, IsInt, IsNotEmpty, IsString, Length } from "class-validator";

import { CourseType } from "./course.type";

import { Course } from "src/entity/course.entity";
import { Tag } from "src/entity/tag.entity";

import { TagDto } from "src/tag/tag.dto";

export class CourseDto implements CourseType {
  static entityConstructor(courseEntity?: Course, tagEntities?: Tag[]): CourseDto {
    const courseDto = new CourseDto();
    courseDto.tags = new Array<TagDto>();

    if (courseEntity.id) {
      courseDto.id = courseEntity.id;
    }
    if (courseEntity.originalCourseId) {
      courseDto.originalCourseId = courseEntity.originalCourseId.id;
    }
    if (courseEntity.color) {
      courseDto.color = courseEntity.color.id;
    }
    if (courseEntity.creatorId) {
      courseDto.creatorId = courseEntity.creatorId.id;
    }
    if (courseEntity.startDate) {
      courseDto.startDate = courseEntity.startDate;
    }
    if (courseEntity.endDate) {
      courseDto.endDate = courseEntity.endDate;
    }
    if (courseEntity.explanation) {
      courseDto.explanation = courseEntity.explanation;
    }
    if (courseEntity.title) {
      courseDto.title = courseEntity.title;
    }
    if (courseEntity.likeCount) {
      courseDto.likeCount = courseEntity.likeCount;
    }

    // Tag entity 값을 입력 한 경우
    if (tagEntities) {
      for (const tagEntity of tagEntities) {
        const tagDto = new TagDto();

        if (tagEntity.id) {
          tagDto.id = tagEntity.id;
        }
        if (tagEntity.value) {
          tagDto.value = tagEntity.value;
        }
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
