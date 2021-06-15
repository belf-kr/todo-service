import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Course } from "./course.entity";
import { User } from "./user.entity";

@Entity({})
export class CoursePriority {
  constructor(userId: number, courseId: number, priority: number, id?: number) {
    this.userId = userId;
    this.courseId = courseId;
    this.priority = priority;
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

  @Column({})
  priority: number;
}
