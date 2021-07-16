import { Test, TestingModule } from "@nestjs/testing";

import { WorkDoneController } from "./work-done.controller";

describe("WorkDoneController", () => {
  let controller: WorkDoneController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkDoneController],
    }).compile();

    controller = module.get<WorkDoneController>(WorkDoneController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
