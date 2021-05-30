import { Controller } from "@nestjs/common";
import { ExampleLowerService } from "./example-lower.service";

@Controller("example-lower")
export class ExampleLowerController {
  constructor(private readonly exampleLowerService: ExampleLowerService) {}
}
