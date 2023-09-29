import { Todo } from "@core/db/entity/Todo";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TodoController } from "./todo.controller";
import { TodoService } from "./todo.service";

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodoController],
  providers: [TodoService],
  exports: [TypeOrmModule],
})
export class TodoModule {}
