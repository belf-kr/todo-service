import { CourseType } from "./course.type";

import { TagType } from "src/tag/tag.type";

export interface CoursePostInterface extends CourseType {
  tags: TagType[];
}
