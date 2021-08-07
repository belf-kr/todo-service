import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { File } from "./file.entity";
import { WorkDone } from "./work-done.entity";

@Entity({})
export class InsertedFileToPage {
  static insertedFileToPageConstructor(id?: number, workDoneId?: WorkDone, fileId?: File): InsertedFileToPage {
    const insertedFileToPageEntity = new InsertedFileToPage();

    if (id) {
      insertedFileToPageEntity.id = id;
    }
    if (workDoneId) {
      insertedFileToPageEntity.workDoneId = workDoneId;
    }
    if (fileId) {
      insertedFileToPageEntity.fileId = fileId;
    }

    return insertedFileToPageEntity;
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
