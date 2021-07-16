import { Module } from "@nestjs/common";

import { WorkDoneService } from "./work-done.service";
import { WorkDoneController } from "./work-done.controller";

@Module({
  providers: [WorkDoneService],
  controllers: [WorkDoneController],
})
export class WorkDoneModule {}
