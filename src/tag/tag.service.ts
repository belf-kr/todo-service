import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CRUDService } from "src/common/crud.service";

import { Tag } from "src/entity/tag.entity";

@Injectable()
export class TagService extends CRUDService<Tag> {
  constructor(@InjectRepository(Tag) tagRepository: Repository<Tag>) {
    super(tagRepository);
  }
}
