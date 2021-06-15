import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Course } from "./course.entity";
import { User } from "./user.entity";

@Entity({})
export class CourseImportation {
  constructor(userId: number, courseId: number, originalCourseId: number, id?: number) {
    this.userId = userId;
    this.courseId = courseId;
    this.originalCourseId = originalCourseId;
    if (id) {
      this.id = id;
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "user_id" })
  userId: number;

  @ManyToOne(() => Course, (course) => course.id, {
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "course_id" })
  courseId: number;

  @ManyToOne(() => Course, (course) => course.id, {
    onDelete: "SET NULL",
    nullable: true,
    eager: true,
  })
  @JoinColumn({
    name: "original_course_id",
  })
  originalCourseId: number;
}
