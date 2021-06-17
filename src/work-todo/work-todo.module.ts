import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { WorkTodoService } from "./work-todo.service";
import { WorkTodoController } from "./work-todo.controller";

import { WorkTodo } from "src/entity/work-todo.entity";

@Module({
  imports: [TypeOrmModule.forFeature([WorkTodo])],
  providers: [WorkTodoService],
  controllers: [WorkTodoController],
})
export class WorkTodoModule {}
