import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Course } from "./course.entity";
import { Tag } from "./tag.entity";

@Entity({})
export class CourseTag {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Course, (course) => course.id, {
    nullable: false,
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "course_id" })
  courseId: number;

  @ManyToOne(() => Tag, (tag) => tag.id, {
    nullable: false,
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "tag_id" })
  tagId: number;
}
