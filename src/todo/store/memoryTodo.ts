import { UnexpectedError } from "@common/error";
import { getIncrement } from "@common/model/WithId";
import { type StoreGetter } from "@common/store/IStore";
import { type TodoModel } from "@core/model/Todo";

import { type ITodoStore } from "./ITodoStore";

let storeTodo: TodoModel[] = [];

export const memoryTodoStore = (() =>
  ({
    add(todo) {
      const id = getIncrement(storeTodo);
      storeTodo.push({ ...todo, id: id });
    },
    changeState(newState, todos) {
      for (const iterator of todos) {
        const todo = todos.find(x => x.value === iterator.value) ?? null;
        if (todo) {
          todo.state = newState;
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
        if (iterator.state.id === state.id) {
          list.push(iterator);
        }
      }

      return list;
    },
  }) as ITodoStore) satisfies StoreGetter<ITodoStore>;
