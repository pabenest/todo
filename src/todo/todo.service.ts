import { Todo } from "@core/db/entity/Todo";
import { type TodoModel } from "@core/model/Todo";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { dbTodoStore } from "../core/db/repository/impl/todoRepository";
import { type ITodoStore } from "../core/db/repository/ITodoRepository";

@Injectable()
export class TodoService implements ITodoStore {
  private readonly todoStore: ITodoStore;
  constructor(@InjectRepository(Todo) private readonly todoRepository: Repository<Todo>) {
    this.todoStore = dbTodoStore(todoRepository);
  }

  public async changeState(newState: number, todos: number[]) {
    await this.todoStore.changeState(newState, todos);
  }

  public async getTodoByStateTodoId(state: number) {
    return this.todoStore.getTodoByStateTodoId(state);
  }

  public async findOne(id: number) {
    return await this.todoStore.findOne(id);
  }

  public async add(todo: Omit<TodoModel, "id">) {
    await this.todoStore.add(todo);
  }

  public async getAll() {
    return this.todoStore.getAll();
  }

  public async update(id: number, todo: Partial<Omit<TodoModel, "id">>) {
    await this.todoStore.update(id, todo);
  }

  public async remove(id: number) {
    await this.todoStore.remove(id);
  }
}
