import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { WorkTodo } from "./work-todo.entity";

@Entity({})
export class RepeatedDaysOfTheWeek {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => WorkTodo, (workToDo) => workToDo.id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "work_todo_id" })
  workTodoId: number;

  @Column({
    name: "day_of_the_week",
  })
  dayOfTheWeek: number;
}
