import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Course } from "./course.entity";
import { User } from "./user.entity";

@Entity({})
export class CoursePriority {
  constructor(id?: number, userId?: User, courseId?: Course, priority?: number) {
    if (id) {
      this.id = id;
    }
    if (userId && userId.id !== undefined) {
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

  @Column({})
  priority: number;
}
