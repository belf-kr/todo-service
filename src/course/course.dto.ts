import { TagType } from "src/tag/tag.type";
import { CourseType } from "./course.type";

export class CourseTypeDto implements CourseType {
  constructor(
    originalCourseId: number = null,
    color: string,
    creatorId: number = null,
    startDate: Date = null,
    endDate: Date = null,
    explanation: string,
    title: string,
    likeCount = 0,
    tags: TagType[]
  ) {
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
  originalCourseId: number;
  color: string;
  creatorId: number;
  startDate: Date;
  endDate: Date;
  explanation: string;
  title: string;
  likeCount: number;
  tags: TagType[];
}
