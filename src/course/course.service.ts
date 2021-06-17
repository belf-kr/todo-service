import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getRepository, Repository } from "typeorm";

import { CRUDService } from "src/common/crud.service";

import { CourseType } from "src/course/course.type";

import { Course } from "src/entity/course.entity";
import { TagType } from "src/tag/tag.type";
import { Tag } from "src/entity/tag.entity";
import { TagService } from "src/tag/tag.service";

@Injectable()
export class CourseService extends CRUDService<Course> {
  constructor(@InjectRepository(Course) courseRepository: Repository<Course>, private readonly tagService: TagService) {
    super(courseRepository);
  }

  async createCourse(coursesInput: CourseType): Promise<void> {
    // Course 객체를 생성해 코스를 생성한다.
    const courseEntities = new Array<Course>();
    const courseEntity = new Course();

    // 생성 시 입력된 key value를 사용해 객체에 값을 입력한다.
    if (coursesInput.title) courseEntity.title = coursesInput.title;
    if (coursesInput.explanation) courseEntity.explanation = coursesInput.explanation;
    if (coursesInput.color) courseEntity.color = coursesInput.color;
    if (coursesInput.creatorId) courseEntity.creatorId = coursesInput.creatorId;
    if (coursesInput.endDate) courseEntity.endDate = coursesInput.endDate;
    if (coursesInput.startDate) courseEntity.startDate = coursesInput.startDate;
    if (coursesInput.likeCount) courseEntity.likeCount = 0;
    courseEntities.push(courseEntity);

    return this.create(courseEntities);
  }

  async getAllCourses(): Promise<Course[]> {
    const blankCourses: Course[] = new Array<Course>();
    const res = await this.find(blankCourses);

    return res;
  }

  async deleteCourse(courseInput: CourseType): Promise<void> {
    const selectResult = await getRepository(Course).createQueryBuilder("c").where("c.id = :courseId", { courseId: courseInput.id }).getMany();

    if (selectResult.length === 0) throw new Error("조건을 만족하는 데이터가 없습니다.");

    selectResult.forEach((coruseItem) => {
      const courseEntity = new Course();
      courseEntity.id = coruseItem.id;
    });
    console.log(selectResult);
    return this.delete(selectResult);
  }

  // 코스 생성 시 입력된 태그가 존재하지 않는 경우 생성한다.
  async createNewTags(tagsInput: TagType[]): Promise<void> {
    // JSON 형태의 입력 값을 Tag entity 배열 객체로 생성
    const inputTagEntities = new Array<Tag>();
    tagsInput.forEach((tag) => {
      // 태그 객체를 생성 한 다음 값을 입력한다.
      const tagEntity = new Tag();
      tagEntity.value = tag.value;
      inputTagEntities.push(tagEntity);
    });

    // 기존에 존재하는 태그들을 알아낸다.
    const existTagEntities = await this.tagService.find(inputTagEntities);
    const newTagEntities = Array<Tag>();
    // 입력한 Tag값이 존재하지 않던 경우 판별
    inputTagEntities.forEach((inputTagEntity) => {
      if (!existTagEntities.find((existTagEntity) => existTagEntity.value === inputTagEntity.value)) {
        newTagEntities.push(inputTagEntity);
      }
    });

    await this.tagService.create(newTagEntities);
  }
}
