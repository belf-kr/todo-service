import { Controller, Get, Param, Post } from "@nestjs/common";
import { Tag } from "src/entity/tag.entity";
import { TagService } from "./tag.service";

@Controller("tag")
export class TagController {
  constructor(private readonly tagService: TagService) {
    this.tagService = tagService;
  }
  @Get()
  async findAll(): Promise<Tag[]> {
    const tagList = await this.tagService.findAll();

    return Object.assign({
      data: tagList,
      statusCode: 200,
      statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
    });
  }

  @Get(":tagId")
  async find(@Param("tagId") tagId: string): Promise<Tag> {
    const tag = await this.tagService.findOne(tagId);

    return Object.assign({
      data: tag,
      statusCode: 200,
      statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
    });
  }
}
