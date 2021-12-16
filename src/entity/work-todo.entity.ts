import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Course } from "./course.entity";

@Entity({})
export class WorkTodo {
  constructor(id?: number, courseId?: Course, recurringCycleDate?: number, title?: string, explanation?: string, activeDate?: Date, userId?: number) {
    if (id) {
      this.id = id;
    }
    if (courseId?.id) {
      this.courseId = courseId;
    }
    if (recurringCycleDate) {
      this.recurringCycleDate = recurringCycleDate;
    }
    if (title) {
      this.title = title;
    }
    if (explanation) {
      this.explanation = explanation;
    }
    if (activeDate) {
      this.activeDate = activeDate;
    }
    if (userId) {
      this.userId = userId;
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Course, (course) => course.id, {
    onDelete: "SET NULL",
    eager: true,
  })
  @JoinColumn({ name: "course_id" })
  courseId: Course;

  @Column({
    nullable: true,
    name: "recurring_cycle_date",
  })
  recurringCycleDate: number;

  @Column({
    length: 50,
    type: "nvarchar",
    charset: "utf8mb4",
  })
  title: string;

  @Column({
    type: "text",
    charset: "utf8mb4",
    nullable: true,
  })
  explanation: string;

  @CreateDateColumn({
    type: "datetime",
    name: "active_date",
  })
  activeDate: Date;

  @Column({
    name: "user_id",
  })
  userId: number;

  @Column({
    name: "is_delete",
    default: false,
  })
  isDelete: boolean;
}
