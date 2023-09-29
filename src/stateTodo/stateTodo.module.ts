import { StateTodo } from "@core/db/entity/StateTodo";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([StateTodo])],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class StateTodoModule {}
