import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Course } from "./course.entity";
import { User } from "./user.entity";

@Entity({})
export class CourseImportation {
  constructor(id?: number, userId?: User, courseId?: Course, originalCourseId?: Course) {
    if (id) {
      this.id = id;
    }
    if (userId && userId.id !== undefined) {
      this.userId = userId;
    }
    if (courseId && courseId.id !== undefined) {
      this.courseId = courseId;
    }
    if (originalCourseId && originalCourseId.id !== undefined) {
      this.originalCourseId = originalCourseId;
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "user_id" })
  userId: User;

  @ManyToOne(() => Course, (course) => course.id, {
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "course_id" })
  courseId: Course;

  @ManyToOne(() => Course, (course) => course.id, {
    onDelete: "SET NULL",
    nullable: true,
    eager: true,
  })
  @JoinColumn({
    name: "original_course_id",
  })
  originalCourseId: Course;
}
