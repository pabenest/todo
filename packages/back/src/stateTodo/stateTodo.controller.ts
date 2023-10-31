import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes } from "@nestjs/common";

import { UpdateStateTodoDto, updateStateTodoDtoSchema } from "../core/dto/statetodo/UpdateStateTodoDto";
import { StateTodoModel } from "../core/model/Todo";
import { ZodValidationPipe } from "../core/pipes/ZodValidationPipe";
import { StateTodoService } from "./stateTodo.service";

@Controller("state-todo")
export class StateTodoController {
  constructor(private readonly stateTodoService: StateTodoService) {}

  @Post()
  add(@Body() instance: StateTodoModel) {
    return this.stateTodoService.add(instance);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    await this.stateTodoService.remove(parseInt(id));
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.stateTodoService.findOne(parseInt(id));
  }
  @Get()
  getAll() {
    return this.stateTodoService.getAll();
  }

  @Put(":id")
  @UsePipes(new ZodValidationPipe(updateStateTodoDtoSchema))
  async update(@Param("id", ParseIntPipe) id: number, @Body() stateTodo: UpdateStateTodoDto) {
    await this.stateTodoService.update(id, {
      isDefault: stateTodo.isDefault,
      value: stateTodo.value,
      isEnd: stateTodo.isEnd,
      isStart: stateTodo.isStart,
    });
  }

  @Get("default")
  async getDefault() {
    return await this.stateTodoService.getDefault();
  }
}
