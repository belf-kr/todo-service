import { IsDate, IsInt, IsNotEmpty, IsString, Length } from "class-validator";

import { CourseType } from "./course.type";

import { Course } from "src/entity/course.entity";

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
      this.title = courseTypeInput.title ?? undefined;
    }
  }

  static entityConstructor(courseEntityInput?: Course) {
    const courseDto = new CourseDto();

    if (courseEntityInput !== undefined) {
      courseDto.color = courseEntityInput.color?.id ?? undefined;
      courseDto.creatorId = courseEntityInput.creatorId ?? undefined;
      courseDto.endDate = courseEntityInput.endDate ?? undefined;
      courseDto.explanation = courseEntityInput.explanation ?? undefined;
      courseDto.id = courseEntityInput.id ?? undefined;
      courseDto.likeCount = courseEntityInput.likeCount ?? undefined;
      courseDto.originalCourseId = courseEntityInput.originalCourseId?.id ?? undefined;
      courseDto.startDate = courseEntityInput.startDate ?? undefined;
      courseDto.title = courseEntityInput.title ?? undefined;
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

  @IsString({})
  explanation: string;

  @IsString({ always: true })
  @IsNotEmpty({ always: true, message: "title에 해당되는 값이 존재하지 않습니다." })
  title: string;

  @IsInt({ groups: ["userUpdate"] })
  likeCount: number;
}
