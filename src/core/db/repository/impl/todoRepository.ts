import { type StoreGetter } from "@common/store/IStore";
import { type Todo } from "@core/db/entity/Todo";
import { type TodoModel } from "@core/model/Todo";
import { type Repository } from "typeorm";

import { type ITodoStore } from "../ITodoRepository";

export const dbTodoStore = ((todoRepository: Repository<Todo>): ITodoStore => ({
  async add(todo) {
    await todoRepository.insert({
      state: {
        id: todo.state,
      },
      value: todo.value,
    });
  },
  async findOne(id) {
    const raw = await todoRepository.findOne({
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
  },
  async changeState(id, todos) {
    await todoRepository.update(todos, { state: { id } });
  },
  async remove(id) {
    await todoRepository.delete(id);
  },
  async getAll() {
    return (
      await todoRepository.find({
        relations: ["state"],
      })
    ).map(todo => ({
      id: todo.id,
      value: todo.value,
      state: todo.state.id,
    }));
  },
  async update(id, todo) {
    await todoRepository.update(id, {
      state: {
        id: todo.state,
      },
      value: todo.value,
    });
  },
  async getTodoByStateTodoId(state) {
    const todos = await this.getAll();
    const list: TodoModel[] = [];
    for (const todo of todos) {
      if (todo.state === state) {
        list.push(todo);
      }
    }

    return list;
  },
})) satisfies StoreGetter<ITodoStore>;
