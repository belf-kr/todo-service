import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { File } from "./file.entity";
import { WorkDone } from "./work-done.entity";

@Entity({})
export class InsertedFileToPage {
  constructor(id?: number, workDoneId?: WorkDone, fileId?: File) {
    if (id) {
      this.id = id;
    }
    if (workDoneId && workDoneId.id !== undefined) {
      this.workDoneId = workDoneId;
    }
    if (fileId && fileId.id !== undefined) {
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

  @ManyToOne(() => File, (file) => file.id, {
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "file_id" })
  fileId: File;
}
