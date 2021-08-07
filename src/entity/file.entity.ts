import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({})
export class File {
  static fileConstructor(id?: number, fileName?: string, originalFileName?: string, directoryPath?: string, extension?: string): File {
    const fileEntity = new File();

    if (id) {
      fileEntity.id = id;
    }
    if (fileName) {
      fileEntity.fileName = fileName;
    }
    if (originalFileName) {
      fileEntity.originalFileName = originalFileName;
    }
    if (directoryPath) {
      fileEntity.directoryPath = directoryPath;
    }
    if (extension) {
      fileEntity.extension = extension;
    }

    return fileEntity;
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
