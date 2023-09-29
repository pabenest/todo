import { Controller, Get } from "@nestjs/common";

import { TodoService } from "./todo.service";

@Controller("todo")
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getAllTodo() {
    return this.todoService.getAll();
  }
}

/*

/todo GET
/todo/:id  GET (/todo/1)
/todo POST
/todo/:id PUT
/todo/:id DELETE

*/
