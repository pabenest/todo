import { StateTodoModel } from "@core/model/Todo";
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";

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

  @Put("default/:id")
  async setDefault(@Param("id") id: string) {
    await this.stateTodoService.setDefault(parseInt(id));
  }

  @Get("default")
  async getDefault() {
    return await this.stateTodoService.getDefault();
  }
}
