import { Test, TestingModule } from "@nestjs/testing";
import { WorkTodoService } from "./work-todo.service";

describe("WorkTodoService", () => {
  let service: WorkTodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkTodoService],
    }).compile();

    service = module.get<WorkTodoService>(WorkTodoService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
