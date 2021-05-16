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
  user_id: number;

  @ManyToOne(() => Course, (course) => course.id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "course_id" })
  course_id: number;

  @Column({})
  priority: number;
}
