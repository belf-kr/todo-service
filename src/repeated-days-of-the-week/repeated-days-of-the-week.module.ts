import { Module } from "@nestjs/common";
import { RepeatedDaysOfTheWeekService } from "./repeated-days-of-the-week.service";
import { RepeatedDaysOfTheWeekController } from "./repeated-days-of-the-week.controller";

@Module({
  providers: [RepeatedDaysOfTheWeekService],
  controllers: [RepeatedDaysOfTheWeekController],
})
export class RepeatedDaysOfTheWeekModule {}
