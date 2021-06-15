import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { File } from "./file.entity";
import { Page } from "./page.entity";

@Entity({})
export class InsertedFileToPage {
  constructor(pageId: number, fileId: number, id?: number) {
    this.pageId = pageId;
    this.fileId = fileId;
    if (id) {
      this.id = id;
    }
  }

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
