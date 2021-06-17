import { Body, Controller, Delete, Get, HttpException, HttpStatus, Post } from "@nestjs/common";
import { getRepository } from "typeorm";

import { CourseService } from "./course.service";
import { CourseTypeDto } from "./course.dto";

import { getErrorHttpStatusCode, getErrorMessage } from "src/common/lib/error";
import { CRUDController } from "src/common/crud.controller";

import { CourseType } from "src/course/course.type";

import { Course } from "src/entity/course.entity";
import { Tag } from "src/entity/tag.entity";
import { CourseTag } from "src/entity/course-tag.entity";

import { CourseTagService } from "src/course-tag/course-tag.service";

import { TagService } from "src/tag/tag.service";

@Controller("course")
export class CourseController extends CRUDController<Course> {
  constructor(private readonly courseService: CourseService, private readonly tagService: TagService, private readonly courseTagService: CourseTagService) {
    super(courseService);
  }

  @Post("create-course")
  async createCourse(@Body() coursesInput: CourseType): Promise<void> {
    try {
      await this.courseService.createCourse(coursesInput);
      await this.courseService.createNewTags(coursesInput.tags);

      const inputTagEntities = new Array<Tag>();
      let tagEntities = new Array<Tag>();

      coursesInput.tags.forEach((tag) => {
        const tagEntity = new Tag();

        tagEntity.value = tag.value;
        inputTagEntities.push(tagEntity);
      });

      // Tag 들의 Id 값 찾기
      if (inputTagEntities.length) {
        tagEntities = await this.tagService.find(inputTagEntities);
      }

      // 코스의 Id 값 알아오기
      let courses = new Array<Course>();
      const courseEntity = new Course();
      if (coursesInput.title) courseEntity.title = coursesInput.title;
      if (coursesInput.explanation) courseEntity.explanation = coursesInput.explanation;
      if (coursesInput.color) courseEntity.color = coursesInput.color;
      if (coursesInput.creatorId) courseEntity.creatorId = coursesInput.creatorId;
      if (coursesInput.endDate) courseEntity.endDate = coursesInput.endDate;
      if (coursesInput.startDate) courseEntity.startDate = coursesInput.startDate;
      if (coursesInput.likeCount) courseEntity.likeCount = courseEntity.likeCount;
      else coursesInput.likeCount = 0;

      courses.push(courseEntity);
      courses = await this.courseService.find(courses);

      // courseTag 관련 삽입 메소드 호출
      const courseTagEntities = new Array<CourseTag>();
      tagEntities.forEach((tag) => {
        // 검색된 course는 무조껀 1개라는 전제가 깔려있다.
        const courseTagEntity = new CourseTag();
        courseTagEntity.courseId = courses[0].id;
        courseTagEntity.tagId = tag.id;
        courseTagEntities.push(courseTagEntity);
      });
      await this.courseTagService.create(courseTagEntities);

      return Object.assign({
        status: HttpStatus.CREATED,
        msg: `create successfully`,
      });
    } catch (error) {
      const httpStatusCode = getErrorHttpStatusCode(error);
      const message = getErrorMessage(error);
      throw new HttpException(message, httpStatusCode);
    }
  }

  @Get("get-all-courses")
  async getAllCourses(): Promise<HttpStatus> {
    try {
      // 코스 리스트 저장
      const serviceResult: Course[] = await this.courseService.getAllCourses();

      if (!serviceResult.length) {
        throw new Error("코스가 존재하지 않습니다.");
      }

      // 결과값 반환 위한 리스트
      const courseResult = Array<CourseTypeDto>();

      // 코스의 정보와 코스에 대한 태그 정보를 입력한다.
      for (const course of serviceResult) {
        // course 상수에 대한 tag 값을 join 해서 가져온다
        /*
          SELECT *
          FROM course
          INNER JOIN course_tag ct on course.id = ct.course_id
          INNER JOIN tag t on ct.tag_id = t.id
          WHERE ct.course_id = ?
        */
        const joinResult = await getRepository(CourseTag)
          .createQueryBuilder("ct")
          .innerJoinAndMapMany("ct", Course, "c", "ct.course_id = c.id")
          .innerJoinAndMapMany("ct", Tag, "t", "ct.tag_id = t.id")
          .where("ct.course_id = :courseId", { courseId: course.id })
          .getRawMany();

        // 태그 배열을 생성하기
        const tagsResult = new Array<Tag>();
        joinResult.forEach((joinItem) => {
          const tagEntity = new Tag();
          tagEntity.value = joinItem["t_value"];
          tagsResult.push(tagEntity);
        });

        courseResult.push(
          new CourseTypeDto(
            course.originalCourseId,
            course.color["id"],
            course.creatorId,
            course.startDate,
            course.endDate,
            course.explanation,
            course.title,
            course.likeCount,
            tagsResult,
            course.id
          )
        );
      }

      return Object.assign({
        course_list: courseResult,
      });
    } catch (error) {
      // 동작에 실패한 경우 Catch 구문에 예외를 넘김
      const httpStatusCode = getErrorHttpStatusCode(error);
      const message = getErrorMessage(error);
      throw new HttpException(message, httpStatusCode);
    }
  }

  @Delete("delete-courses")
  async deleteCourses(@Body() courseInput: CourseType): Promise<HttpStatus> {
    try {
      await this.courseService.deleteCourse(courseInput);

      return Object.assign({
        msg: `delete successfully`,
      });
    } catch (error) {
      // 동작에 실패한 경우 Catch 구문에 예외를 넘김
      const httpStatusCode = getErrorHttpStatusCode(error);
      const message = getErrorMessage(error);
      throw new HttpException(message, httpStatusCode);
    }
  }
}
