import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CRUDService } from "src/common/crud.service";

import { Color } from "src/entity/color.entity";

@Injectable()
export class ColorService extends CRUDService<Color> {
  constructor(@InjectRepository(Color) colorRepository: Repository<Color>) {
    super(colorRepository);
  }
}