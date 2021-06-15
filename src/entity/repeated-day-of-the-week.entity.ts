import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { WorkTodo } from "./work-todo.entity";

@Entity({})
export class RepeatedDaysOfTheWeek {
  constructor(workTodoId: number, dayOfTheWeek: number, id?: number) {
    this.workTodoId = workTodoId;
    this.dayOfTheWeek = dayOfTheWeek;
    if (id) {
      this.id = id;
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => WorkTodo, (workToDo) => workToDo.id, {
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "work_todo_id" })
  workTodoId: number;

  @Column({
    name: "day_of_the_week",
  })
  dayOfTheWeek: number;
}
