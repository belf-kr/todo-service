import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { WorkTodo } from "./work-todo.entity";

@Entity({})
export class RepeatedDaysOfTheWeek {
  constructor(id?: number, workTodoId?: WorkTodo, dayOfTheWeek?: number) {
    if (id) {
      this.id = id;
    }
    if (workTodoId && workTodoId.id !== undefined) {
      this.workTodoId = workTodoId;
    }
    if (dayOfTheWeek) {
      this.dayOfTheWeek = dayOfTheWeek;
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => WorkTodo, (workToDo) => workToDo.id, {
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "work_todo_id" })
  workTodoId: WorkTodo;

  @Column({
    name: "day_of_the_week",
  })
  dayOfTheWeek: number;
}
