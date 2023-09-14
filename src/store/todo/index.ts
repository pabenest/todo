import { config, type StoreType } from "../../config";
import { type IStateTodo, type ITodo } from "../../model/Todo";
import { fileStateTodoStore } from "./fileStateTodo";
import { fileTodoStore } from "./fileTodo";
import { type IStateTodoStore } from "./IStateTodoStore";
import { type ITodoStore } from "./ITodoStore";
import { memoryStateTodoStore } from "./MemoryStateTodo";
import { memoryTodoStore } from "./memoryTodo";

class UnimplementedTodoStore implements ITodoStore {
  changeState(): Promise<void> | void {
    throw new Error("Method not implemented.");
  }
  add(): Promise<void> | void {
    throw new Error("Method not implemented.");
  }
  getAll(): ITodo[] | Promise<ITodo[]> {
    throw new Error("Method not implemented.");
  }
  remove(): void {
    throw new Error("Method not implemented.");
  }
}
const unimplementedTodoStore = new UnimplementedTodoStore();

const todoStores: Record<StoreType, ITodoStore> = {
  memory: memoryTodoStore,
  // TODO: Implement the other stores
  file: fileTodoStore,
  db: unimplementedTodoStore,
  mock: unimplementedTodoStore,
};

export const getTodoStore = (name = config.store.type): ITodoStore => todoStores[name] ?? unimplementedTodoStore;

class UnimplementedStateTodoStore implements IStateTodoStore {
  add(): Promise<void> | void {
    throw new Error("Method not implemented.");
  }
  getAll(): IStateTodo[] | Promise<IStateTodo[]> {
    throw new Error("Method not implemented.");
  }
  remove(): void {
    throw new Error("Method not implemented.");
  }
  getDefault(): IStateTodo | Promise<IStateTodo> {
    throw new Error("Method not implemented.");
  }
}
const unimplementedStateTodoStore = new UnimplementedStateTodoStore();

const stores: Record<StoreType, IStateTodoStore> = {
  memory: memoryStateTodoStore,
  // TODO: Implement the other stores
  file: fileStateTodoStore,
  db: unimplementedStateTodoStore,
  mock: unimplementedStateTodoStore,
};

export const getStateTodoStore = (name = config.store.type): IStateTodoStore =>
  stores[name] ?? unimplementedStateTodoStore;
