import { CourseType } from "./course.type";

import { TagType } from "src/tag/tag.type";

export interface CourseGetInterface extends CourseType {
  tags: TagType[];
  userEmail: string;
}
