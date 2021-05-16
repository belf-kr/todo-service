import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Color } from "./color.entity";
import { User } from "./user.entity";

@Entity({})
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Course, (course) => course.id, {
    onDelete: "SET NULL",
    nullable: true,
  })
  @JoinColumn({ name: "original_course_id" })
  originalCourseId: number;

  @ManyToOne(() => Color, (color) => color.id, {
    onDelete: "SET NULL",
    nullable: true,
  })
  @JoinColumn({ name: "color" })
  color: string;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "creator_id" })
  creatorId: number;

  @Column({
    type: "date",
    nullable: true,
    name: "start_date",
  })
  startDate: Date;

  @Column({
    type: "date",
    nullable: true,
    name: "end_date",
  })
  endDate: Date;

  @Column({
    length: 50,
    type: "nvarchar",
    charset: "utf8mb4",
  })
  title: string;

  @Column({
    type: "text",
    nullable: true,
  })
  explanation: string;

  @Column({
    default: 0,
    name: "like_count",
  })
  likeCount: number;
}