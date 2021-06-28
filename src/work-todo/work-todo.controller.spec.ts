import { Test, TestingModule } from "@nestjs/testing";
import { WorkTodoController } from "./work-todo.controller";

describe("WorkTodoController", () => {
  let controller: WorkTodoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkTodoController],
    }).compile();

    controller = module.get<WorkTodoController>(WorkTodoController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
