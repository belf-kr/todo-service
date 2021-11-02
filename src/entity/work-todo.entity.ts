import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Course } from "./course.entity";

@Entity({})
export class WorkTodo {
  constructor(id?: number, courseId?: Course, recurringCycleDate?: number, title?: string, explanation?: string, passedDay?: number, addDate?: Date) {
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
    if (passedDay) {
      this.passedDay = passedDay;
    }
    if (addDate) {
      this.addDate = addDate;
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

  @Column({
    default: 0,
    name: "passed_day",
  })
  passedDay: number;

  @CreateDateColumn({
    type: "datetime",
    name: "add_date",
  })
  addDate: Date;
}
