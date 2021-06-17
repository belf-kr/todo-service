import { Module } from "@nestjs/common";
import { WorkTodoService } from "./work-todo.service";
import { WorkTodoController } from "./work-todo.controller";

@Module({
  providers: [WorkTodoService],
  controllers: [WorkTodoController],
})
export class WorkTodoModule {}
