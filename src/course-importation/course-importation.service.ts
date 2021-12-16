import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getRepository, Repository } from "typeorm";

import { CourseImportationDto } from "./course-importation.dto";

import { CRUDService } from "src/common/crud.service";

import { Course } from "src/entity/course.entity";
import { CourseImportation } from "src/entity/course-importation.entity";

import { CourseService } from "src/course/course.service";
import { CourseQuerystringDto } from "src/course/course-querystring.dto";

@Injectable()
export class CourseImportationService extends CRUDService<CourseImportation> {
  constructor(@InjectRepository(CourseImportation) courseImportationRepository: Repository<CourseImportation>, private readonly courseService: CourseService) {
    super(courseImportationRepository);
  }

  async createCourseImportation(courseImportationDtoInput: CourseImportationDto): Promise<CourseImportation> {
    // 올바른 FK인지 검증한다.
    const originalCourseEntityResult = await this.courseService.getCoursesByConditions(
      new CourseQuerystringDto(undefined, courseImportationDtoInput.originalCourseId)
    );
    const courseEntityResult = await this.courseService.getCoursesByConditions(new CourseQuerystringDto(undefined, courseImportationDtoInput.courseId));

    if (originalCourseEntityResult.length === 0) {
      throw new HttpException({ data: "originalCourseId 값을 만족하는 데이터가 없습니다.", status: HttpStatus.NOT_FOUND }, HttpStatus.NOT_FOUND);
    }

    if (courseEntityResult.length === 0) {
      throw new HttpException({ data: "courseId 값을 만족하는 데이터가 없습니다.", status: HttpStatus.NOT_FOUND }, HttpStatus.NOT_FOUND);
    }

    const courseImportationEntities = new Array<CourseImportation>();
    const courseImportationEntity = new CourseImportation(
      undefined,
      courseImportationDtoInput.userId,
      new Course(courseImportationDtoInput.courseId, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined),
      new Course(courseImportationDtoInput.originalCourseId, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined)
    );

    courseImportationEntities.push(courseImportationEntity);

    return (await this.create(courseImportationEntities))[0];
  }

  async withdrawalUser(userId: number) {
    await getRepository(CourseImportation).createQueryBuilder("ci").delete().where("ci.user_id = :userId", { userId: userId }).execute();
  }
}
