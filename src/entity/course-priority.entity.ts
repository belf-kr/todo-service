import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Course } from "./course.entity";
import { User } from "./user.entity";

@Entity({})
export class CoursePriority {
  static coursePriorityConstructor(id?: number, userId?: User, courseId?: Course, priority?: number): CoursePriority {
    const coursePriorityEntity = new CoursePriority();

    if (id) {
      coursePriorityEntity.id = id;
    }
    if (userId) {
      coursePriorityEntity.userId = userId;
    }
    if (courseId) {
      coursePriorityEntity.courseId = courseId;
    }
    if (priority) {
      coursePriorityEntity.priority = priority;
    }

    return coursePriorityEntity;
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
