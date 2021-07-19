import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { User } from "./user.entity";
import { WorkTodo } from "./work-todo.entity";

@Entity({})
export class WorkDone {
  @PrimaryGeneratedColumn()
  id: number;

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
  content: string;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: "SET NULL",
    eager: true,
  })
  @JoinColumn({ name: "user_id" })
  userId: number;

  @ManyToOne(() => WorkTodo, (workToDo) => workToDo.id, {
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "work_todo_id" })
  workTodoId: number;

  @CreateDateColumn({
    type: "datetime",
    name: "action_date",
    nullable: true,
    default: () => null,
  })
  actionDate: Date;
}
