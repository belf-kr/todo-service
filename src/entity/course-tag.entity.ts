import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Course } from "./course.entity";
import { Tag } from "./tag.entity";

@Entity({})
export class CourseTag {
  static courseTagConstructor(id?: number, courseId?: Course, tagId?: Tag): CourseTag {
    const courseTagEntity = new CourseTag();

    if (id) {
      courseTagEntity.id = id;
    }
    if (courseId) {
      courseTagEntity.courseId = courseId;
    }
    if (tagId) {
      courseTagEntity.tagId = tagId;
    }

    return courseTagEntity;
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
