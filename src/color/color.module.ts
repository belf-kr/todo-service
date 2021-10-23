import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ColorController } from "./color.controller";
import { ColorService } from "./color.service";

import { Color } from "src/entity/color.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Color])],
  controllers: [ColorController],
  providers: [ColorService],
})
export class ColorModule {}
