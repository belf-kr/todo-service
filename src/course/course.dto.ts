import { IsArray, IsDate, IsInt, IsNotEmpty, IsString, Length } from "class-validator";

import { CourseType } from "./course.type";

import { TagDto } from "src/tag/tag.dto";

export class CourseDto implements CourseType {
  constructor(
    id?: number,
    originalCourseId?: number,
    color?: string,
    creatorId?: number,
    startDate?: Date,
    endDate?: Date,
    explanation?: string,
    title?: string,
    likeCount?: number,
    tags?: TagDto[]
  ) {
    this.id = id;
    this.originalCourseId = originalCourseId;
    this.color = color;
    this.creatorId = creatorId;
    this.startDate = startDate;
    this.endDate = endDate;
    this.explanation = explanation;
    this.title = title;
    this.likeCount = likeCount;
    this.tags = tags;
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
