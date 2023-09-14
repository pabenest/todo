import { type IStateTodo, type ITodo } from "../../model/Todo";
import { type ITodoStore } from "./ITodoStore";

let index = 0;
let storeTodo: ITodo[] = [];

export const memoryTodoStore: ITodoStore = {
  add(todo: ITodo): void {
    storeTodo.push({ ...todo, id: index++ });
  },
  changeState(newState: IStateTodo, todos: ITodo[]): void {
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
  getAll(): ITodo[] | Promise<ITodo[]> {
    return [...storeTodo];
  },
};
