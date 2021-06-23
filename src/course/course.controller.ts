import { Body, Controller, Delete, Get, HttpStatus, Post } from "@nestjs/common";

import { CourseService } from "./course.service";

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

      // API에 에러를 토스
      return Object.assign({
        httpStatusCode: httpStatusCode,
        message: message,
      });
    }
  }

  @Get("get-all-courses")
  async getAllCourses(): Promise<HttpStatus> {
    try {
      // 코스 리스트 저장
      const serviceResult: Course[] = await this.courseService.getAllCourses();

      return Object.assign({
        course_list: serviceResult,
      });
    } catch (error) {
      // 동작에 실패한 경우 Catch 구문에 예외를 넘김
      const httpStatusCode = getErrorHttpStatusCode(error);
      const message = getErrorMessage(error);

      // API에 에러를 토스
      return Object.assign({
        httpStatusCode: httpStatusCode,
        message: message,
      });
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

      // API에 에러를 토스
      return Object.assign({
        httpStatusCode: httpStatusCode,
        message: message,
      });
    }
  }
}
