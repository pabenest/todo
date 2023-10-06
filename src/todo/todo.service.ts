import { Todo } from "@core/db/entity/Todo";
import { type TodoModel } from "@core/model/Todo";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class TodoService {
  constructor(@InjectRepository(Todo) private readonly todoRepository: Repository<Todo>) {}

  public async changeState(id: number, todos: number[]) {
    await this.todoRepository.update(todos, { state: { id } });
  }

  public async getTodoByStateTodoId(state: number) {
    const todos = await this.getAll();
    const list: TodoModel[] = [];
    for (const todo of todos) {
      if (todo.state === state) {
        list.push(todo);
      }
    }

    return list;
  }

  public async findOne(id: number) {
    const raw = await this.todoRepository.findOne({
      where: {
        id,
      },
    });

    if (!raw) {
      return null;
    }

    return {
      id: raw.id,
      value: raw.value,
      state: raw.state.id,
    };
  }

  public async add(todo: Omit<TodoModel, "id">) {
    await this.todoRepository.insert({
      state: {
        id: todo.state,
      },
      value: todo.value,
    });
  }

  public async getAll() {
    return (
      await this.todoRepository.find({
        relations: ["state"],
      })
    ).map(todo => ({
      id: todo.id,
      value: todo.value,
      state: todo.state.id,
    }));
  }

  public async update(id: number, todo: Partial<Omit<TodoModel, "id">>) {
    await this.todoRepository.update(id, {
      state: {
        id: todo.state,
      },
      value: todo.value,
    });
  }

  public async remove(id: number) {
    await this.todoRepository.delete(id);
  }
}
