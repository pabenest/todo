import { type StateTodoModel, type TodoModel } from "../../model/Todo";
import { type ITodoStore } from "./ITodoStore";

let index = 0;
let storeTodo: TodoModel[] = [];

export const memoryTodoStore: ITodoStore = {
  add(todo: TodoModel): void {
    storeTodo.push({ ...todo, id: index++ });
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
};
