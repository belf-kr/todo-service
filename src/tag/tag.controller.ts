import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Tag } from "src/entity/tag.entity";
import { TagService } from "./tag.service";

@Controller("tag")
export class TagController {
  constructor(private readonly tagService: TagService) {
    this.tagService = tagService;
  }

  //  Create
  @Post()
  async create(@Body() tag: Tag): Promise<string> {
    this.tagService.create(tag);
    return Object.assign({
      data: { ...tag },
      statusCode: 201,
      statusMsg: `saved successfully`,
    });
  }
  //  Read
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

  //   Update
  @Put()
  async update(@Body() tag: Tag): Promise<string> {
    await this.tagService.update(tag);
    return Object.assign({
      data: { tagId: tag.id.toString(), tag },
      statusCode: 201,
      statusMsg: `update successfully`,
    });
  }

  // Delete
  @Delete()
  async remove(@Body() tag: Tag): Promise<string> {
    await this.tagService.remove(tag.id.toString());
    return Object.assign({
      data: { userId: tag.id.toString() },
      statusCode: 201,
      statusMsg: `deleted successfully`,
    });
  }
}
