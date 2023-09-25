import { error } from "console";

import { getIncrement } from "../../common/model/WithId";
import { type StateTodoModel, type TodoModel } from "../../model/Todo";
import { type ITodoStore } from "./ITodoStore";

let storeTodo: TodoModel[] = [];

export const memoryTodoStore: ITodoStore = {
  add(todo: TodoModel): void {
    const id = getIncrement(storeTodo);
    storeTodo.push({ ...todo, id: id });
  },
  changeState(newState: StateTodoModel, todos: TodoModel[]): void {
    for (const iterator of todos) {
      const todo = todos.find(x => x.value === iterator.value) ?? null;
      if (todo) {
        todo.state = newState;
      }
    }
  },
  remove(id: number): void {
    storeTodo = storeTodo.filter(x => id !== x.id);
  },
  getAll(): Promise<TodoModel[]> | TodoModel[] {
    return [...storeTodo];
  },

  getTodoByStateTodo(state): Promise<TodoModel[]> | TodoModel[] {
    if (state === undefined) {
      throw error("Le paramètre ne peut pas être vide.");
    }

    const todos: TodoModel[] = storeTodo;
    const list: TodoModel[] = [];
    for (const iterator of todos) {
      if (iterator.state.id === state.id) {
        list.push(iterator);
      }
    }

    return list;
  },
};
