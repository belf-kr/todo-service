import { Controller } from "@nestjs/common";

import { ExampleUpperService } from "./example-upper.service";

import { ExampleUpper } from "src/entity/example-upper.entity";
import { CRUDController } from "src/common/crud.controller";

@Controller("example-upper")
export class ExampleUpperController extends CRUDController<ExampleUpper> {
  constructor(readonly exampleUpperService: ExampleUpperService) {
    super(exampleUpperService);
  }
}
