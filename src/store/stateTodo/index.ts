import { config, type StoreType as StoreState } from "../../config";
import { type StateTodo } from "../../model/StateTodo";
import { type Todo } from "../../model/Todo";
import { type IStateTodoStore as IStateTodoStore } from "./IStateTodoStore";
import { memoryTypeTodoStore } from "./MemoryStateTodo";

class unimplementedStateTodoStore implements IStateTodoStore {
  add(instance: Omit<StateTodo, "id">): Promise<void> | void {
    throw new Error("Method not implemented.");
  }
  getAll(): Promise<StateTodo[]> | StateTodo[] {
    throw new Error("Method not implemented.");
  }
  remove(id: number): void {
    throw new Error("Method not implemented.");
  }
  getDefault(): Promise<Todo> | Todo {
    throw new Error("Method not implemented.");
  }
}
const unimplemented = new unimplementedStateTodoStore();

const stores: Record<StoreState, IStateTodoStore> = {
  memory: memoryTypeTodoStore,
  // TODO: Implement the other stores
  file: unimplemented,
  db: unimplemented,
  mock: unimplemented,
};

export const getStateTodoStore = (name = config.store.type): IStateTodoStore =>
  stores[name] ?? unimplementedStateTodoStore;
