import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./course.entity";

@Entity({})
export class WorkTodo {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Course, (course) => course.id, {
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "course_id" })
  courseId: number;

  @Column({
    nullable: true,
    name: "recurring_cycle_date",
  })
  recurringCycleDate: number;

  @Column({
    length: 50,
    type: "nvarchar",
    charset: "utf8mb4",
  })
  title: string;

  @Column({
    type: "text",
    charset: "utf8mb4",
  })
  explanation: string;

  @Column({
    default: 0,
    name: "passed_day",
  })
  passedDay: number;

  @CreateDateColumn({
    name: "add_date",
  })
  addDate: Date;
}
