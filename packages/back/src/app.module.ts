import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import ormconfig from "./core/db/ormconfig";
import { StateTodoController } from "./stateTodo/stateTodo.controller";
import { StateTodoModule } from "./stateTodo/stateTodo.module";
import { StateTodoService } from "./stateTodo/stateTodo.service";
import { TodoModule } from "./todo/todo.module";

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), TodoModule, StateTodoModule],
  controllers: [StateTodoController],
  providers: [StateTodoService],
})
export class AppModule {}
