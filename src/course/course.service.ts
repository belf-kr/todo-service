import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getRepository, Repository } from "typeorm";

import { CourseDto } from "./course.dto";
import { CourseGetDto } from "./course-get.dto";
import { CoursePostDto } from "./course-post.dto";

import { CRUDService } from "src/common/crud.service";

import { Course } from "src/entity/course.entity";
import { Tag } from "src/entity/tag.entity";
import { CourseTag } from "src/entity/course-tag.entity";
import { Color } from "src/entity/color.entity";

import { TagService } from "src/tag/tag.service";
import { TagType } from "src/tag/tag.type";

import { CourseTagService } from "src/course-tag/course-tag.service";

import { ColorService } from "src/color/color.service";

@Injectable()
export class CourseService extends CRUDService<Course> {
  constructor(
    @InjectRepository(Course) courseRepository: Repository<Course>,
    private readonly tagService: TagService,
    private readonly courseTagService: CourseTagService,
    private readonly colorService: ColorService
  ) {
    super(courseRepository);
  }

  async createCourse(courseDtoInput: CourseDto): Promise<void> {
    const colorEntity = new Color(courseDtoInput.color);

    // 입력한 color 외래키의 존재 여부를 검증한다.
    const colorEntities = new Array<Color>();
    colorEntities.push(colorEntity);
    const colorEntitiesResult = await this.colorService.find(colorEntities);
    if (!colorEntitiesResult.length) {
      throw new HttpException({ data: "존재하지 않는 색상의 id값 입니다.", status: HttpStatus.BAD_REQUEST }, HttpStatus.BAD_REQUEST);
    }

    // Course 객체를 생성해 코스를 생성한다.
    const courseEntities = new Array<Course>();
    const courseEntity = new Course(
      undefined,
      new Course(courseDtoInput.originalCourseId, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined),
      colorEntity,
      courseDtoInput.creatorId,
      courseDtoInput.startDate,
      courseDtoInput.endDate,
      courseDtoInput.explanation,
      courseDtoInput.title,
      0
    );

    // 생성 시 입력된 key value를 사용해 객체에 값을 입력한다.
    courseEntities.push(courseEntity);

    await this.create(courseEntities);
  }

  async getAllCourses(): Promise<CourseGetDto[]> {
    // TypeORM 사용해서 검색을 할 때 조건을 주지 않고 전체 검색을 위한 Course entity 배열
    const blankCourseEntities: Course[] = new Array<Course>();
    const courseEntitiesResult = await this.find(blankCourseEntities);
    // DTO 형태로 반환하기 위한 CourseDTO 배열
    const courseGetDtoArrayResult = new Array<CourseGetDto>();

    // course 테이블과 course-tag 테이블의 조인 처리
    // 코스의 정보와 코스에 대한 태그 정보를 입력한다.
    for (const courseEntity of courseEntitiesResult) {
      // course에 대한 tag 값을 join 해서 가져온다
      /*
          SELECT *
          FROM course c
          LEFT  JOIN course_tag ct on c.id = ct.course_id
          LEFT  JOIN tag t on ct.tag_id = t.id
          WHERE ct.course_id = ?
        */
      const joinResult = await getRepository(Course)
        .createQueryBuilder("c")
        .leftJoinAndMapMany("c", CourseTag, "ct", "c.id = ct.course_id")
        .leftJoinAndMapMany("c", Tag, "t", "ct.tag_id = t.id")
        .where("ct.course_id = :courseId", { courseId: courseEntity.id })
        .getRawMany();

      // Tag Entity 배열을 생성하기
      const tagEntitiesResult = new Array<Tag>();
      for (const joinItem of joinResult) {
        const tagEntity = new Tag();
        tagEntity.value = joinItem["t_value"];
        tagEntitiesResult.push(tagEntity);
      }

      const courseGetDto = CourseGetDto.entityConstructor(courseEntity, tagEntitiesResult);
      courseGetDtoArrayResult.push(courseGetDto);
    }

    return courseGetDtoArrayResult;
  }

  async deleteCourse(id: number): Promise<void> {
    const courseEntities = new Array<Course>();
    const courseEntity = new Course(id, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);

    courseEntities.push(courseEntity);
    const selectResult = await this.find(courseEntities);

    if (selectResult.length === 0) {
      throw new HttpException({ data: "조건을 만족하는 데이터가 없습니다.", status: HttpStatus.BAD_REQUEST }, HttpStatus.BAD_REQUEST);
    }

    await this.delete(selectResult);
  }

  // 코스 생성 시 입력된 태그가 존재하지 않는 경우 생성한다.
  async createNewTags(tagsTypeInput: TagType[]): Promise<void> {
    // JSON 형태의 입력 값을 Tag entity 배열 객체로 생성
    const tagEntitiesInput = new Array<Tag>();
    for (const tag of tagsTypeInput) {
      // 태그 객체를 생성 한 다음 값을 입력한다.
      const tagEntity = new Tag(undefined, tag.value);
      tagEntitiesInput.push(tagEntity);
    }

    const newTagEntities = Array<Tag>();
    // 기존에 존재하는 태그들을 알아낸다.
    const existTagEntities = await this.tagService.find(tagEntitiesInput);
    // 입력한 Tag값이 존재하지 않던 경우 판별
    for (const tagEntity of tagEntitiesInput) {
      if (!existTagEntities.find((existTagEntity) => existTagEntity.value === tagEntity.value)) {
        newTagEntities.push(tagEntity);
      }
    }

    await this.tagService.create(newTagEntities);
  }

  // 코스와 태그의 관계를 삽입 해 주기 위한 메소드
  async createCourseTag(coursePostDtoInput: CoursePostDto): Promise<void> {
    let tagEntitiesFindResult = new Array<Tag>();

    const inputTagEntities = new Array<Tag>();
    for (const tagType of coursePostDtoInput.tags) {
      const tagEntity = new Tag(undefined, tagType.value);
      inputTagEntities.push(tagEntity);
    }

    // Tag 들의 Id 값 찾기
    if (inputTagEntities.length) {
      tagEntitiesFindResult = await this.tagService.find(inputTagEntities);
    }

    let courseEntitiesFindResult = new Array<Course>();
    // 코스의 Id 값 알아오기
    const courseEntity = new Course(
      undefined,
      new Course(coursePostDtoInput.originalCourseId, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined),
      new Color(coursePostDtoInput.color),
      coursePostDtoInput.creatorId,
      coursePostDtoInput.startDate,
      coursePostDtoInput.endDate,
      coursePostDtoInput.explanation,
      coursePostDtoInput.title,
      coursePostDtoInput.likeCount
    );

    courseEntitiesFindResult.push(courseEntity);
    courseEntitiesFindResult = await this.find(courseEntitiesFindResult);

    // courseTag 관련 삽입 메소드 호출
    const courseTagEntities = new Array<CourseTag>();
    for (const tag of tagEntitiesFindResult) {
      const tagEntity = new Tag(tag.id, undefined);
      // 검색된 course는 무조껀 1개라는 전제가 깔려있다.
      const courseEntity = new Course(courseEntitiesFindResult[0].id, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
      const courseTagEntity = new CourseTag(undefined, courseEntity, tagEntity);

      courseTagEntities.push(courseTagEntity);
    }

    await this.courseTagService.create(courseTagEntities);
  }
}
