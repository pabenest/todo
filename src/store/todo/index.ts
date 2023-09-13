import { config, type StoreType } from "../../config";
import { type Todo } from "../../model/Todo";
import { type TypeTodo } from "../../model/TypeTodo";
import { type ITodoStore } from "./ITodoStore";
import { memoryTodoStore } from "./memoryTodo";

class unimplementedTodoStore implements ITodoStore {
  changeState(newState: TypeTodo, todos: TypeTodo[]): Promise<void> | void {
    throw new Error("Method not implemented.");
  }
  add(instance: Omit<Todo, "id">): Promise<void> | void {
    throw new Error("Method not implemented.");
  }
  getAll(): Promise<Todo[]> | Todo[] {
    throw new Error("Method not implemented.");
  }
  remove(id: number): void {
    throw new Error("Method not implemented.");
  }
}
const unimplemented = new unimplementedTodoStore();

const stores: Record<StoreType, ITodoStore> = {
  memory: memoryTodoStore,
  // TODO: Implement the other stores
  file: unimplemented,
  db: unimplemented,
  mock: unimplemented,
};

export const getTodoStore = (name = config.store.type): ITodoStore => stores[name] ?? unimplementedTodoStore;
