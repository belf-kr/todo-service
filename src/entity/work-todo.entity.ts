import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Course } from "./course.entity";

@Entity({})
export class WorkTodo {
  static workTodoConstructor(
    id?: number,
    courseId?: Course,
    recurringCycleDate?: number,
    title?: string,
    explanation?: string,
    passedDay?: number,
    addDate?: Date
  ): WorkTodo {
    const workTodoEntity = new WorkTodo();

    if (id) {
      workTodoEntity.id = id;
    }
    if (courseId) {
      workTodoEntity.courseId = courseId;
    }
    if (recurringCycleDate) {
      workTodoEntity.recurringCycleDate = recurringCycleDate;
    }
    if (title) {
      workTodoEntity.title = title;
    }
    if (explanation) {
      workTodoEntity.explanation = explanation;
    }
    if (passedDay) {
      workTodoEntity.passedDay = passedDay;
    }
    if (addDate) {
      workTodoEntity.addDate = addDate;
    }

    return workTodoEntity;
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
