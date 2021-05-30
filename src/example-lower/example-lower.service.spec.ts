import { Test, TestingModule } from "@nestjs/testing";
import { ExampleLowerService } from "./example-lower.service";

describe("ExampleLowerService", () => {
  let service: ExampleLowerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExampleLowerService],
    }).compile();

    service = module.get<ExampleLowerService>(ExampleLowerService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
