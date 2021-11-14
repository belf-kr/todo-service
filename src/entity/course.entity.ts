import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { Color } from "./color.entity";

@Entity({})
export class Course {
  constructor(
    id?: number,
    originalCourseId?: Course,
    color?: Color,
    creatorId?: number,
    startDate?: Date,
    endDate?: Date,
    explanation?: string,
    title?: string,
    likeCount?: number
  ) {
    if (id) {
      this.id = id;
    }
    if (originalCourseId && originalCourseId.id !== undefined) {
      this.originalCourseId = originalCourseId;
    }
    if (color) {
      this.color = color;
    }
    if (creatorId !== undefined) {
      this.creatorId = creatorId;
    }
    if (startDate) {
      this.startDate = startDate;
    }
    if (endDate) {
      this.endDate = endDate;
    }
    if (explanation) {
      this.explanation = explanation;
    }
    if (title) {
      this.title = title;
    }
    if (likeCount) {
      this.likeCount = likeCount;
    }
  }

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

  @Column({ name: "creator_id" })
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
