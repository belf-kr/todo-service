import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { RepeatedDaysOfTheWeekService } from "./repeated-days-of-the-week.service";
import { RepeatedDaysOfTheWeekController } from "./repeated-days-of-the-week.controller";

import { RepeatedDaysOfTheWeek } from "src/entity/repeated-day-of-the-week.entity";

@Module({
  imports: [TypeOrmModule.forFeature([RepeatedDaysOfTheWeek])],
  providers: [RepeatedDaysOfTheWeekService],
  controllers: [RepeatedDaysOfTheWeekController],
})
export class RepeatedDaysOfTheWeekModule {}
