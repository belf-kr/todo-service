import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Course } from "./course.entity";

@Entity({})
export class CoursePriority {
  constructor(id?: number, userId?: number, courseId?: Course, priority?: number) {
    if (id) {
      this.id = id;
    }
    if (userId !== undefined) {
      this.userId = userId;
    }
    if (courseId && courseId.id !== undefined) {
      this.courseId = courseId;
    }
    if (priority) {
      this.priority = priority;
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: "user_id",
  })
  userId: number;

  @ManyToOne(() => Course, (course) => course.id, {
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "course_id" })
  courseId: Course;

  @Column({})
  priority: number;
}
