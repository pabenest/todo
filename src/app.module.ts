import ormconfig from "@core/db/ormconfig";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { StateTodoModule } from "./stateTodo/stateTodo.module";
import { TodoModule } from "./todo/todo.module";

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), TodoModule, StateTodoModule],
})
export class AppModule {}
