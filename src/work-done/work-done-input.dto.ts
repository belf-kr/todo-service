import { WorkDoneInputType } from "./work-done-input.type";
import { WorkDoneDto } from "./work-done.dto";

import { PageDto } from "src/page/page.dto";

export class WorkDoneInputDto implements WorkDoneInputType {
  workDone: WorkDoneDto;
  page: PageDto;
}
