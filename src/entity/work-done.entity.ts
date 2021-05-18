import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Page } from "./page.entity";
import { User } from "./user.entity";
import { WorkTodo } from "./work-todo.entity";

@Entity({})
export class WorkDone {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "user_id" })
  userId: number;

  @ManyToOne(() => WorkTodo, (workToDo) => workToDo.id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "work_todo_id" })
  workTodoId: number;

  @ManyToOne(() => Page, (page) => page.id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "page_id" })
  pageId: number;

  @CreateDateColumn({
    type: "datetime",
    name: "action_date",
  })
  actionDate: Date;
}
