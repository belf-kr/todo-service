import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Tag } from "src/entity/tag.entity";
import { Repository } from "typeorm";

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>
  ) {}

  //   Create
  async create(tag: Tag): Promise<void> {
    this.tagRepository.save(tag);

    return;
  }

  //   Read
  findAll(): Promise<Tag[]> {
    return this.tagRepository.find();
  }

  //   Read
  findOne(id: string): Promise<Tag> {
    return this.tagRepository.findOne(id);
  }

  //   Update
  async update(tag: Tag): Promise<void> {
    await this.tagRepository.update(tag.id, tag);
  }

  //   Delete
  async remove(id: string): Promise<void> {
    await this.tagRepository.delete(id);
  }
}
