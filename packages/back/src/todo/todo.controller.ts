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
import { CreateTodoDto, createTodoDtoSchema } from "../core/dto/todo/CreateTodoDto";
import { type TodoDto } from "../core/dto/todo/TodoDto";
import { UpdateTodoDto, updateTodoDtoSchema } from "../core/dto/todo/UpdateTodoDto";
import { StateTodoService } from "../stateTodo/stateTodo.service";
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
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateTodoDtoSchema)) partialTodo: UpdateTodoDto,
  ) {
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
    const todos = (await this.todoService.getAll()).map<TodoDto>(model => ({
      id: model.id,
      state: model.state,
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
