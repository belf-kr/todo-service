import { Body, Controller, HttpException, HttpStatus, Post } from "@nestjs/common";

import { getErrorHttpStatusCode, getErrorMessage } from "src/common/lib/error";
import { CRUDController } from "src/common/crud.controller";

import { Course } from "src/entity/course.entity";
import { Tag } from "src/entity/tag.entity";

import { CourseTagService } from "src/course-tag/course-tag.service";
import { TagService } from "src/tag/tag.service";

import { CourseService } from "./course.service";

type TagType = {
  value: string;
};

type CourseType = {
  originalCourseId: number;
  color: string;
  creatorId: number;
  explanation: string;
  title: string;
  likeCount: number;
  tags: TagType[];
};

@Controller("course")
export class CourseController extends CRUDController<Course> {
  constructor(private readonly courseService: CourseService, private readonly tagService: TagService, private readonly courseTagService: CourseTagService) {
    super(courseService);
  }

  @Post("create-course")
  async createCourse(@Body() coursesInput: CourseType): Promise<void> {
    try {
      await this.courseService.createCourse(coursesInput);

      let tags = new Array<Tag>();
      coursesInput.tags.forEach((tag) => {
        tags.push(new Tag(tag.value));
      });
      await this.tagService.create(tags);

      // Tag 들의 Id 값 찾기
      tags = await this.tagService.find(tags);
      // TODO: 코스의 Id 값 알아오기
      // TODO: courseTag 관련 삽입 메소드 호출

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
}
