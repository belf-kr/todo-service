import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { File } from "./file.entity";
import { Page } from "./page.entity";

@Entity({})
export class InsertedFileToPage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Page, (page) => page.id, {
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "page_id" })
  pageId: number;

  @ManyToOne(() => File, (file) => file.id, {
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "file_id" })
  fileId: number;
}
