import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Course } from "./course.entity";
import { Tag } from "./tag.entity";

@Entity({})
export class CourseTag {
  constructor(id?: number, courseId?: Course, tagId?: Tag) {
    if (id) {
      this.id = id;
    }
    if (courseId && courseId.id !== undefined) {
      this.courseId = courseId;
    }
    if (tagId && tagId.id !== undefined) {
      this.tagId = tagId;
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Course, (course) => course.id, {
    nullable: false,
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "course_id" })
  courseId: Course;

  @ManyToOne(() => Tag, (tag) => tag.id, {
    nullable: false,
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "tag_id" })
  tagId: Tag;
}
