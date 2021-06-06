import { Test, TestingModule } from "@nestjs/testing";
import { ExampleUpperController } from "./example-upper.controller";

describe("ExampleUpperController", () => {
  let controller: ExampleUpperController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExampleUpperController],
    }).compile();

    controller = module.get<ExampleUpperController>(ExampleUpperController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
