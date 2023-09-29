import { config } from "@common/config";
import { UnexpectedError } from "@common/error";
import { Todo } from "@core/db/entity/Todo";
import { type StateTodoModel, type TodoModel } from "@core/model/Todo";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { dbTodoStore } from "./store/dbTodo";
import { fileTodoStore } from "./store/fileTodo";
import { fileWorkerTodoStore } from "./store/fileWorkerTodo";
import { type ITodoStore } from "./store/ITodoStore";
import { memoryTodoStore } from "./store/memoryTodo";

@Injectable()
export class TodoService implements ITodoStore {
  private readonly todoStore: ITodoStore;
  constructor(@InjectRepository(Todo) private readonly todoRepository: Repository<Todo>) {
    switch (config.store.type) {
      case "db":
        this.todoStore = dbTodoStore(todoRepository);
        break;
      case "memory":
        this.todoStore = memoryTodoStore();
        break;
      case "file":
        this.todoStore = fileTodoStore();
        break;
      case "fileworker":
        this.todoStore = fileWorkerTodoStore();
        break;
      case "mock":
      default:
        throw new UnexpectedError("Type de store inconnu.");
    }
  }

  public async changeState(newState: StateTodoModel, todos: TodoModel[]) {
    await this.todoStore.changeState(newState, todos);
  }

  public async getTodoByStateTodo(state: StateTodoModel) {
    return this.todoStore.getTodoByStateTodo(state);
  }

  public async add(instance: Omit<TodoModel, "id">) {
    await this.todoStore.add(instance);
  }

  public async getAll() {
    return this.todoStore.getAll();
  }

  public async remove(id: number) {
    await this.todoStore.remove(id);
  }
}
