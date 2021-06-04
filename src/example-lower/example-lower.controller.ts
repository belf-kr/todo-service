import { Controller } from "@nestjs/common";

import { ExampleLowerService } from "./example-lower.service";

import { ExampleLower } from "src/entity/example-lower.entity";
import { CRUDController } from "src/common/crud.controller";

@Controller("example-lower")
export class ExampleLowerController extends CRUDController<ExampleLower> {
  constructor(readonly exampleLowerService: ExampleLowerService) {
    super(exampleLowerService);
  }
}
