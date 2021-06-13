import { Body, Controller, Get, HttpException, HttpStatus, Post } from "@nestjs/common";

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

      // JSON 형태의 입력 값을 Tag entity 배열 객체로 생성
      let inputTags = new Array<Tag>();
      coursesInput.tags.forEach((tag) => {
        inputTags.push(new Tag(tag.value));
      });

      const existTags = await this.tagService.find(inputTags);
      const newTags = Array<Tag>();
      // 입력한 Tag값이 존재하지 않던 경우 판별
      inputTags.forEach((inputTag) => {
        if (!existTags.find((existTag) => existTag.value === inputTag.value)) {
          newTags.push(inputTag);
        }
      });
      await this.tagService.create(newTags);

      // Tag 들의 Id 값 찾기
      inputTags = await this.tagService.find(inputTags);

      // 코스의 Id 값 알아오기
      let courses = new Array<Course>();
      const course = new Course(
        coursesInput.originalCourseId,
        coursesInput.color,
        coursesInput.creatorId,
        coursesInput.startDate,
        coursesInput.endDate,
        coursesInput.explanation,
        coursesInput.title,
        coursesInput.likeCount
      );
      courses.push(course);
      courses = await this.courseService.find(courses);

      // courseTag 관련 삽입 메소드 호출
      const courseTags = new Array<CourseTag>();
      inputTags.forEach((tag) => {
        // 검색된 course는 무조껀 1개라는 전제가 깔려있다.
        courseTags.push(new CourseTag(courses[0].id, tag.id));
      });
      this.courseTagService.create(courseTags);

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
      const courseResult = Array<Course>();

      for (const course of serviceResult) {
        courseResult.push(course);
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
}
