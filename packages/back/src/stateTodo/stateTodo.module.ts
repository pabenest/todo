import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { StateTodo } from "../core/db/entity/StateTodo";
import { StateTodoController } from "./stateTodo.controller";
import { StateTodoService } from "./stateTodo.service";

@Module({
  imports: [TypeOrmModule.forFeature([StateTodo])],
  controllers: [StateTodoController],
  providers: [StateTodoService],
  exports: [TypeOrmModule, StateTodoService],
})
export class StateTodoModule {}
