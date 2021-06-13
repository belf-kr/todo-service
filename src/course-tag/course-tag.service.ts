import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CRUDService } from "src/common/crud.service";

import { CourseTag } from "src/entity/course-tag.entity";

@Injectable()
export class CourseTagService extends CRUDService<CourseTag> {
  constructor(@InjectRepository(CourseTag) courseTagRepository: Repository<CourseTag>) {
    super(courseTagRepository);
  }
}
