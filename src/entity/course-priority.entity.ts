import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./course.entity";
import { User } from "./user.entity";

@Entity({})
export class CoursePriority {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  userId: number;

  @ManyToOne(() => Course, (course) => course.id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "course_id" })
  courseId: number;

  @Column({
    nullable: false,
  })
  priority: number;
}
