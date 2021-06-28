import { Controller } from "@nestjs/common";

import { TagService } from "./tag.service";

import { Tag } from "src/entity/tag.entity";

import { CRUDController } from "src/common/crud.controller";

@Controller("tags")
export class TagController extends CRUDController<Tag> {
  constructor(private readonly tagService: TagService) {
    super(tagService);
  }
}
