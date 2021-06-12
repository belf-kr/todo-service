import { TagType } from "./tag.type";

export type CourseType = {
  originalCourseId: number;
  color: string;
  creatorId: number;
  explanation: string;
  title: string;
  likeCount: number;
  tags: TagType[];
};
