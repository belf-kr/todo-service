import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CRUDService } from "src/common/crud.service";

import { RepeatedDaysOfTheWeek } from "src/entity/repeated-day-of-the-week.entity";

@Injectable()
export class RepeatedDaysOfTheWeekService extends CRUDService<RepeatedDaysOfTheWeek> {
  constructor(@InjectRepository(RepeatedDaysOfTheWeek) repeatedDaysOfTheWeekRepository: Repository<RepeatedDaysOfTheWeek>) {
    super(repeatedDaysOfTheWeekRepository);
  }
}
