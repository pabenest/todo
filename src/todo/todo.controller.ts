import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
} from "@nestjs/common";

import { ZodValidationPipe } from "../common/pipes/ZodValidationPipe";
import { StateTodoService } from "../stateTodo/stateTodo.service";
import { CreateTodoDto, createTodoDtoSchema } from "./dto/CreateTodoDto";
import { type TodoDto } from "./dto/TodoDto";
import { UpdateTodoDto, updateTodoDtoSchema } from "./dto/UpdateTodoDto";
import { TodoService } from "./todo.service";

@Controller("todo")
export class TodoController {
  constructor(
    private readonly todoService: TodoService,
    private readonly stateTodoService: StateTodoService,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createTodoDtoSchema))
  add(@Body() todo: CreateTodoDto) {
    console.log("add:", todo);
    return this.todoService.add({
      //toModel(todo)
      state: todo.state,
      value: todo.value,
    });
  }

  @Put(":id")
  @UsePipes(new ZodValidationPipe(updateTodoDtoSchema))
  async update(@Param("id", ParseIntPipe) id: number, @Body() partialTodo: UpdateTodoDto) {
    console.log("update:", partialTodo);
    await this.todoService.update(id, {
      //toModel(todo) (partial)
      state: partialTodo.state,
      value: partialTodo.value,
    });
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number) {
    console.log("delete todo:" + id);
    await this.todoService.remove(id);
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number) {
    const found = await this.todoService.findOne(id);
    if (!found) throw new NotFoundException(`Todo with id ${id} not found`);
    return found;
  }

  @Get()
  async getAll() {
    console.log("getAll todo");
    const states = await this.stateTodoService.getAll();
    const todos = (await this.todoService.getAll()).map<TodoDto>(model => ({
      //toDto(model)
      id: model.id,
      state: states.find(state => state.id === model.state)!,
      value: model.value,
    }));
    return todos;
  }

  // public async getTodoByStateTodo(state: number) {
  //   console.log("getTodoByStateTodo todo:" + state);
  //   return this.todoService.getTodoByStateTodoId(state);
  // }
}

/*

/todo GET
/todo/:id  GET (/todo/1)
/todo POST
/todo/:id PUT
/todo/:id DELETE

*/
