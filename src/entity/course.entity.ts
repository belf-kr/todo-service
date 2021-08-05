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
  originalCourseId: Course;

  @ManyToOne(() => Color, (color) => color.id, {
    onDelete: "SET NULL",
    nullable: true,
    eager: true,
  })
  @JoinColumn({ name: "color" })
  color: Color;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: "SET NULL",
    eager: true,
  })
  @JoinColumn({ name: "creator_id" })
  creatorId: User;

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
    type: "text",
    charset: "utf8mb4",
    nullable: true,
  })
  explanation: string;

  @Column({
    length: 50,
    type: "nvarchar",
    charset: "utf8mb4",
  })
  title: string;

  @Column({
    default: 0,
    name: "like_count",
  })
  likeCount: number;
}
