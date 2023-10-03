import { type TodoModel } from "@core/model/Todo";
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";

import { ChangeStateDto } from "./dto/ChangeStateDto";
import { TodoService } from "./todo.service";

@Controller("todo")
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  add(@Body() instance: TodoModel) {
    console.log("add:", instance);
    return this.todoService.add(instance);
  }

  @Put("change-state")
  async changeState(@Body() changeState: ChangeStateDto) {
    console.log("changeState:", changeState);
    await this.todoService.changeState(changeState.newState, changeState.todos);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    console.log("delete todo:" + id);
    await this.todoService.remove(parseInt(id));
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    console.log("findOne todo:" + id);
    return await this.todoService.findOne(parseInt(id));
  }

  @Get()
  getAll() {
    console.log("getAll todo");
    return this.todoService.getAll();
  }

  public async getTodoByStateTodo(state: number) {
    console.log("getTodoByStateTodo todo:" + state);
    return this.todoService.getTodoByStateTodo(state);
  }
}

/*

/todo GET
/todo/:id  GET (/todo/1)
/todo POST
/todo/:id PUT
/todo/:id DELETE

*/
