import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Course } from "./course.entity";

@Entity({})
export class WorkTodo {
  constructor(id?: number, courseId?: Course, recurringCycleDate?: number, title?: string, explanation?: string, activeDate?: Date) {
    if (id) {
      this.id = id;
    }
    if (courseId && courseId.id !== undefined) {
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
  }

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Course, (course) => course.id, {
    onDelete: "CASCADE",
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
}
