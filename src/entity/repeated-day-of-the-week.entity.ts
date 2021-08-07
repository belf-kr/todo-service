import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { WorkTodo } from "./work-todo.entity";

@Entity({})
export class RepeatedDaysOfTheWeek {
  static repeatedDaysOfTheWeekConstructor(id?: number, workTodoId?: WorkTodo, dayOfTheWeek?: number): RepeatedDaysOfTheWeek {
    const repeatedDaysOfTheWeekEntity = new RepeatedDaysOfTheWeek();

    if (id) {
      repeatedDaysOfTheWeekEntity.id = id;
    }
    if (workTodoId) {
      repeatedDaysOfTheWeekEntity.workTodoId = workTodoId;
    }
    if (dayOfTheWeek) {
      repeatedDaysOfTheWeekEntity.dayOfTheWeek = dayOfTheWeek;
    }

    return repeatedDaysOfTheWeekEntity;
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
