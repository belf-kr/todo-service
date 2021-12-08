import { Test, TestingModule } from "@nestjs/testing";
import { CourseImportationService } from "./course-importation.service";

describe("CourseImportationService", () => {
  let service: CourseImportationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseImportationService],
    }).compile();

    service = module.get<CourseImportationService>(CourseImportationService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
