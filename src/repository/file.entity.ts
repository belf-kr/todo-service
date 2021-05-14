import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
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
