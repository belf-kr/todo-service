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

  async createColor(colorDtoInput: ColorDto): Promise<Color> {
    const colorEntity = new Color(colorDtoInput.id);

    const colorEntities = new Array<Color>();
    colorEntities.push(colorEntity);

    return (await this.create(colorEntities))[0];
  }

  async getAllColors(): Promise<string[]> {
    const blankColorEntities: Color[] = new Array<Color>();
    // Color DTO class 형태에 맞추어 ORM 결과를 저장
    const colorDtoResult: ColorDto[] = new Array<ColorDto>();
    const colorEntitiesResult = await this.find(blankColorEntities);

    // DTO 객체에 삽입
    for (const colorEntity of colorEntitiesResult) {
      colorDtoResult.push(ColorDto.entityConstructor(colorEntity));
    }

    // API 스펙에 맞추어 Array 형태를 반환 해 준다.
    const colorArrayResult = new Array<string>();
    for (const colorDto of colorDtoResult) {
      colorArrayResult.push(colorDto.id);
    }

    return colorArrayResult;
  }
}
