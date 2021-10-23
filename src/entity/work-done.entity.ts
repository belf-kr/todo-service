import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { WorkTodo } from "./work-todo.entity";

@Entity({})
export class WorkDone {
  constructor(id?: number, title?: string, content?: string, userId?: number, workTodoId?: WorkTodo, actionDate?: Date) {
    if (id) {
      this.id = id;
    }
    if (title) {
      this.title = title;
    }
    if (content) {
      this.content = content;
    }
    if (userId !== undefined) {
      this.userId;
    }
    if (workTodoId && workTodoId.id !== undefined) {
      this.workTodoId = workTodoId;
    }
    if (actionDate) {
      this.actionDate = actionDate;
    }
  }

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

  @Column({ nullable: true, name: "user_id" })
  userId: number;

  @ManyToOne(() => WorkTodo, (workToDo) => workToDo.id, {
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "work_todo_id" })
  workTodoId: WorkTodo;

  @CreateDateColumn({
    type: "datetime",
    name: "action_date",
    nullable: true,
    default: () => null,
  })
  actionDate: Date;
}
