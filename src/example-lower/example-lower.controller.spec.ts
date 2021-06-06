import { Test, TestingModule } from "@nestjs/testing";
import { ExampleLowerController } from "./example-lower.controller";
import { ExampleLowerService } from "./example-lower.service";

describe("ExampleLowerController", () => {
  let controller: ExampleLowerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExampleLowerController],
      providers: [ExampleLowerService],
    }).compile();

    controller = module.get<ExampleLowerController>(ExampleLowerController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
