import { Test, TestingModule } from "@nestjs/testing";
import { RepeatedDaysOfTheWeekController } from "./repeated-days-of-the-week.controller";

describe("RepeatedDaysOfTheWeekController", () => {
  let controller: RepeatedDaysOfTheWeekController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RepeatedDaysOfTheWeekController],
    }).compile();

    controller = module.get<RepeatedDaysOfTheWeekController>(RepeatedDaysOfTheWeekController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
