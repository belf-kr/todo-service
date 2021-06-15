import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({})
export class File {
  constructor(fileName: string, originalFileName: string, directoryPath: string, extension: string, id?: number) {
    this.file_name = fileName;
    this.original_file_name = originalFileName;
    this.directory_path = directoryPath;
    this.extension = extension;
    if (id) {
      this.id = id;
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
    unique: true,
  })
  file_name: string;

  @Column({
    length: 255,
    type: "nvarchar",
    charset: "utf8mb4",
  })
  original_file_name: string;

  @Column({
    length: 500,
  })
  directory_path: string;

  @Column({
    length: 10,
  })
  extension: string;
}
