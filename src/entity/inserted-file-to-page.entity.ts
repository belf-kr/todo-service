import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { WorkDone } from "./work-done.entity";

@Entity({})
export class InsertedFileToPage {
  constructor(id?: number, workDoneId?: WorkDone, fileId?: number) {
    if (id) {
      this.id = id;
    }
    if (workDoneId && workDoneId.id !== undefined) {
      this.workDoneId = workDoneId;
    }
    if (fileId !== undefined) {
      this.fileId = fileId;
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => WorkDone, (workDone) => workDone.id, {
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "work_done_id" })
  workDoneId: WorkDone;

  @Column({ name: "file_id" })
  fileId: number;
}
