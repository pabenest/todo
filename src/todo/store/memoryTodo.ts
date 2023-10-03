import { UnexpectedError } from "@common/error";
import { getIncrement } from "@common/model/WithId";
import { type StoreGetter } from "@common/store/IStore";
import { type TodoModel } from "@core/model/Todo";

import { memoryStateTodoStore } from "../../stateTodo/store/memoryStateTodo";
import { type ITodoStore } from "./ITodoStore";

let storeTodo: TodoModel[] = [];

export const memoryTodoStore = ((): ITodoStore => ({
  add(todo) {
    const id = getIncrement(storeTodo);
    storeTodo.push({ ...todo, id: id });
  },
  findOne(id) {
    return storeTodo.find(x => x.id === id) ?? null;
  },
  async changeState(newState, todos) {
    for (const id of todos) {
      const temp = await this.findOne(id);
      if (temp) {
        const state = await memoryStateTodoStore().findOne(newState);
        if (state) {
          temp.state = state.id;
        }
      }
    }
  },
  remove(id) {
    storeTodo = storeTodo.filter(x => id !== x.id);
  },
  getAll() {
    return [...storeTodo];
  },
  update(id, todo) {
    const index = storeTodo.findIndex(x => x.id === id);
    if (index !== -1) {
      storeTodo[index] = { ...storeTodo[index], ...todo };
    }
  },
  getTodoByStateTodoId(state) {
    if (state === undefined) {
      throw new UnexpectedError("Le paramètre ne peut pas être vide.");
    }

    const todos = storeTodo;
    const list: TodoModel[] = [];
    for (const iterator of todos) {
      if (iterator.state === state) {
        list.push(iterator);
      }
    }

    return list;
  },
})) satisfies StoreGetter<ITodoStore>;
