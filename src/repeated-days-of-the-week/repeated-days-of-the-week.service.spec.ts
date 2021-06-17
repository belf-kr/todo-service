import { Test, TestingModule } from "@nestjs/testing";
import { RepeatedDaysOfTheWeekService } from "./repeated-days-of-the-week.service";

describe("RepeatedDaysOfTheWeekService", () => {
  let service: RepeatedDaysOfTheWeekService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RepeatedDaysOfTheWeekService],
    }).compile();

    service = module.get<RepeatedDaysOfTheWeekService>(RepeatedDaysOfTheWeekService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
