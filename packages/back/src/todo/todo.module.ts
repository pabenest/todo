import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Todo } from "../core/db/entity/Todo";
import { StateTodoModule } from "../stateTodo/stateTodo.module";
import { TodoController } from "./todo.controller";
import { TodoService } from "./todo.service";

@Module({
  imports: [TypeOrmModule.forFeature([Todo]), StateTodoModule],
  controllers: [TodoController],
  providers: [TodoService],
  exports: [TypeOrmModule],
})
export class TodoModule {}
