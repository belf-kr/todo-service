import { Test, TestingModule } from "@nestjs/testing";
import { ExampleUpperService } from "./example-upper.service";

describe("ExampleUpperService", () => {
  let service: ExampleUpperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExampleUpperService],
    }).compile();

    service = module.get<ExampleUpperService>(ExampleUpperService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
