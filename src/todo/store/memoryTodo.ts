import { UnexpectedError } from "@common/error";
import { getIncrement } from "@common/model/WithId";
import { type StoreGetter } from "@common/store/IStore";
import { type TodoModel } from "@core/model/Todo";
import { memoryStateTodoStore } from "src/stateTodo/store/memoryStateTodo";

import { type ITodoStore } from "./ITodoStore";

let storeTodo: TodoModel[] = [];

export const memoryTodoStore = (() =>
  ({
    add(todo) {
      const id = getIncrement(storeTodo);
      storeTodo.push({ ...todo, id: id });
    },
    findOne(id) {
      return storeTodo.find(x => x.id === id);
    },
    async changeState(newState, todos) {
      for (const id of todos) {
        const temp = await this.findOne(id);
        if (temp) {
          const state = await memoryStateTodoStore().findOne(newState);
          if (state) {
            temp.state = state;
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

    getTodoByStateTodo(state) {
      if (state === undefined) {
        throw new UnexpectedError("Le paramètre ne peut pas être vide.");
      }

      const todos = storeTodo;
      const list: TodoModel[] = [];
      for (const iterator of todos) {
        if (iterator.state.id === state) {
          list.push(iterator);
        }
      }

      return list;
    },
  }) as ITodoStore) satisfies StoreGetter<ITodoStore>;
