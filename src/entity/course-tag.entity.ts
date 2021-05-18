import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./course.entity";
import { Tag } from "./tag.entity";

@Entity({})
export class CourseTag {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Course, (course) => course.id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "course_id" })
  courseId: number;

  @ManyToOne(() => Tag, (tag) => tag.id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "tag_id" })
  tagId: number;
}
