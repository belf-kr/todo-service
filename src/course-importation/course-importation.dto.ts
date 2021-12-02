import { IsInt } from "class-validator";

import { CourseImportationType } from "./course-importation.type";

import { CourseImportation } from "src/entity/course-importation.entity";

export class CourseImportationDto implements CourseImportationType {
  constructor(courseImportationTypeInput?: CourseImportationType) {
    this.id = courseImportationTypeInput?.id ?? undefined;
    this.userId = courseImportationTypeInput?.userId ?? undefined;
    this.courseId = courseImportationTypeInput?.courseId ?? undefined;
    this.originalCourseId = courseImportationTypeInput?.originalCourseId ?? undefined;
  }

  static entityConstructor(courseImportationEntityInput?: CourseImportation) {
    const courseImportationDto = new CourseImportationDto();

    courseImportationDto.id = courseImportationEntityInput?.id ?? undefined;
    courseImportationDto.userId = courseImportationEntityInput?.userId ?? undefined;
    courseImportationDto.courseId = courseImportationEntityInput?.courseId?.id ?? undefined;
    courseImportationDto.originalCourseId = courseImportationEntityInput?.originalCourseId?.id ?? undefined;

    return courseImportationDto;
  }
  @IsInt({ groups: ["generated"] })
  id: number;

  @IsInt({ always: true, message: "userId 값이 비어있습니다." })
  userId: number;

  @IsInt({ groups: ["userInput"], message: "courseId 값이 비어있습니다." })
  courseId: number;

  @IsInt({ groups: ["userInput"], message: "originalCourseId 값이 비어있습니다." })
  originalCourseId: number;
}
