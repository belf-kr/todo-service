import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { WorkTodo } from "./work-todo.entity";

@Entity({})
export class RepeatedDaysOfTheWeek {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => WorkTodo, (work_to_do) => work_to_do.id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "work_todo_id" })
  workToDoId: number;

  @Column({
    name: "day_of_the_week",
  })
  dayOfTheWeek: number;
}
