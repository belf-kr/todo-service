import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { File } from "./file.entity";
import { WorkDone } from "./work-done.entity";

@Entity({})
export class InsertedFileToPage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => WorkDone, (workDone) => workDone.id, {
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "work_done_id" })
  workDoneId: number;

  @ManyToOne(() => File, (file) => file.id, {
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "file_id" })
  fileId: number;
}
