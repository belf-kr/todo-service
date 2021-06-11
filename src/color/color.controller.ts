import { Controller } from "@nestjs/common";

import { ColorService } from "./color.service";

import { CRUDController } from "src/common/crud.controller";

import { Color } from "src/entity/color.entity";

@Controller("color")
export class ColorController extends CRUDController<Color> {
  constructor(private readonly colorService: ColorService) {
    super(colorService);
  }
}
