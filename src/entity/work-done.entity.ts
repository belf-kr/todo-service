import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { WorkTodo } from "./work-todo.entity";

import { WorkDoneDto } from "src/work-done/work-done.dto";

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
    if (userId) {
      this.userId = userId;
    }
    if (workTodoId && workTodoId.id !== undefined) {
      this.workTodoId = workTodoId;
    }
    if (actionDate) {
      this.actionDate = actionDate;
    }
  }

  static dtoConstructor(workDoneDtoInput: WorkDoneDto): WorkDone {
    const workDoneEntity = new WorkDone();

    workDoneEntity.id = workDoneDtoInput.id ?? undefined;
    workDoneEntity.title = workDoneDtoInput.title ?? undefined;
    workDoneEntity.content = workDoneDtoInput.content ?? undefined;
    workDoneEntity.userId = workDoneDtoInput.userId ?? undefined;
    workDoneEntity.workTodoId = new WorkTodo(workDoneDtoInput?.workTodoId, undefined, undefined, undefined, undefined, undefined, undefined);
    workDoneEntity.actionDate = workDoneDtoInput.actionDate ?? undefined;

    return workDoneEntity;
  }

  static dtosConstructor(workDoneDtosInput: WorkDoneDto[]): WorkDone[] {
    const workDoneEntities = new Array<WorkDone>();

    for (const workDoneDto of workDoneDtosInput) {
      workDoneEntities.push(this.dtoConstructor(workDoneDto));
    }

    return workDoneEntities;
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

  @Column({ name: "user_id" })
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
    nullable: false,
  })
  actionDate: Date;
}
