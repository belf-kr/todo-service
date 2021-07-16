import { Test, TestingModule } from "@nestjs/testing";

import { WorkDoneService } from "./work-done.service";

describe("WorkDoneService", () => {
  let service: WorkDoneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkDoneService],
    }).compile();

    service = module.get<WorkDoneService>(WorkDoneService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
