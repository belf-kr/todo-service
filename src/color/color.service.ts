import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { ColorDto } from "./color.dto";

import { CRUDService } from "src/common/crud.service";

import { Color } from "src/entity/color.entity";

@Injectable()
export class ColorService extends CRUDService<Color> {
  constructor(@InjectRepository(Color) colorRepository: Repository<Color>) {
    super(colorRepository);
  }

  async getAllColors(): Promise<string[]> {
    const blankColorEntities: Color[] = new Array<Color>();
    // Color entity class 형태에 맞추어 ORM 결과를 저장
    const colorDtoResult: ColorDto[] = new Array<ColorDto>();
    const colorEntitiesResult = await this.find(blankColorEntities);

    // DTO 객체에 삽입
    for (const colorEntity of colorEntitiesResult) {
      const colorDto = new ColorDto();
      colorDto.id = colorEntity.id;
      colorDtoResult.push(colorDto);
    }

    // API 스펙에 맞추어 Array 형태를 반환 해 준다.
    const colorArrayResult = new Array<string>();
    for (const colorDto of colorDtoResult) {
      colorArrayResult.push(colorDto.id);
    }

    return colorArrayResult;
  }
}
