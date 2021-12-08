import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getRepository, Repository } from "typeorm";

import { TagQuerystringDto } from "./tag.querystring.dto";
import { TagDto } from "./tag.dto";

import { CRUDService } from "src/common/crud.service";

import { Tag } from "src/entity/tag.entity";
import { CourseTag } from "src/entity/course-tag.entity";

@Injectable()
export class TagService extends CRUDService<Tag> {
  constructor(@InjectRepository(Tag) tagRepository: Repository<Tag>) {
    super(tagRepository);
  }

  async getTagsByConditions(querystringInput: TagQuerystringDto): Promise<TagDto[]> {
    /*
      SELECT t.value
      FROM course_tag ct
      INNER JOIN tag t on ct.tag_id = t.id
      GROUP BY t.value;
    */
    let sqlQueryString = getRepository(CourseTag).createQueryBuilder("ct").select(["t.value"]).innerJoin(Tag, "t", "ct.tag_id = t.id");

    if (querystringInput.courseId) {
      sqlQueryString = sqlQueryString.andWhere("ct.course_id = :courseId", { courseId: querystringInput.courseId });
    }
    sqlQueryString = sqlQueryString.groupBy("t.value");

    const tagRawEntitiesResult = await sqlQueryString.getRawMany();
    const tagDtoArrayResult = new Array<TagDto>();

    for (const tagRawItem of tagRawEntitiesResult) {
      const tagDto = new TagDto({ id: undefined, value: tagRawItem["t_value"] });

      tagDtoArrayResult.push(tagDto);
    }

    return tagDtoArrayResult;
  }
}
