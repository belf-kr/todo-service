import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({})
export class File {
  constructor(id?: number, fileName?: string, originalFileName?: string, directoryPath?: string, extension?: string) {
    if (id) {
      this.id = id;
    }
    if (fileName) {
      this.fileName = fileName;
    }
    if (originalFileName) {
      this.originalFileName = originalFileName;
    }
    if (directoryPath) {
      this.directoryPath = directoryPath;
    }
    if (extension) {
      this.extension = extension;
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
    unique: true,
  })
  fileName: string;

  @Column({
    length: 255,
    type: "nvarchar",
    charset: "utf8mb4",
  })
  originalFileName: string;

  @Column({
    length: 500,
  })
  directoryPath: string;

  @Column({
    length: 10,
  })
  extension: string;
}
