import { TagType } from "../tag/tag.type";

export type CourseType = {
  id: number;
  originalCourseId: number;
  color: string;
  creatorId: number;
  startDate: Date;
  endDate: Date;
  explanation: string;
  title: string;
  likeCount: number;
  tags: TagType[];
};
