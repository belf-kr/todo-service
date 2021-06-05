import { Controller } from "@nestjs/common";

import { ExampleLowerService } from "./example-lower.service";

import { ExampleLower } from "src/entity/example-lower.entity";
import { CRUDController } from "src/common/crud.controller";

@Controller("example-lower")
// CRUD 컨트롤러를 상속
// 어떤 타입을 컨트롤러에서 종적으로 사용하고 싶은지 <자료형> 식으로 입력
export class ExampleLowerController extends CRUDController<ExampleLower> {
  // 서비스 객체를 생성 후, 부모 클래스의 생성자에 super 키워드를 사용해 넣어 줌
  constructor(private readonly exampleLowerService: ExampleLowerService) {
    super(exampleLowerService);
  }
}
