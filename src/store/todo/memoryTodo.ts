import { type StateTodo } from "../../model/StateTodo";
import { type Todo } from "../../model/Todo";
import { type ITodoStore } from "./ITodoStore";

let index = 0;
let storeTodo: Todo[] = [];

export const memoryTodoStore: ITodoStore = {
  add(todo: Todo): void {
    storeTodo.push({ ...todo, id: index++ });
  },
  changeState(newState: StateTodo, todos: Todo[]): void {
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
  getAll(): Promise<Todo[]> | Todo[] {
    return [...storeTodo];
  },
};
