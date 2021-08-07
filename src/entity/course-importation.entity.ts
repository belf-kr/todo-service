import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Course } from "./course.entity";
import { User } from "./user.entity";

@Entity({})
export class CourseImportation {
  static courseImportationConstructor(id?: number, userId?: User, courseId?: Course, originalCourseId?: Course): CourseImportation {
    const courseImportationEntity = new CourseImportation();

    if (id) {
      courseImportationEntity.id = id;
    }
    if (userId) {
      courseImportationEntity.userId = userId;
    }
    if (courseId) {
      courseImportationEntity.courseId = courseId;
    }
    if (originalCourseId) {
      courseImportationEntity.originalCourseId = originalCourseId;
    }

    return courseImportationEntity;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "user_id" })
  userId: User;

  @ManyToOne(() => Course, (course) => course.id, {
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "course_id" })
  courseId: Course;

  @ManyToOne(() => Course, (course) => course.id, {
    onDelete: "SET NULL",
    nullable: true,
    eager: true,
  })
  @JoinColumn({
    name: "original_course_id",
  })
  originalCourseId: Course;
}
