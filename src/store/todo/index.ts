import { config, type StoreType } from "../../config";
import { initDb } from "../../db/datasource";
import { dbStateTodoStore } from "./dbStateTodo";
import { dbTodoStore } from "./dbTodo";
import { fileStateTodoStore } from "./fileStateTodo";
import { fileTodoStore } from "./fileTodo";
import { fileWorkerStateTodoStore } from "./fileWorkerStateTodo";
import { fileWorkerTodoStore } from "./fileWorkerTodo";
import { type IStateTodoStore } from "./IStateTodoStore";
import { type ITodoStore } from "./ITodoStore";
import { memoryStateTodoStore } from "./memoryStateTodo";
import { memoryTodoStore } from "./memoryTodo";
import { unimplementedStateTodoStore, unimplementedTodoStore } from "./unimplemented";

const todoStores: Record<StoreType, ITodoStore> = {
  memory: memoryTodoStore,
  file: fileTodoStore,
  fileworker: fileWorkerTodoStore,
  db: dbTodoStore,
  mock: unimplementedTodoStore,
};

export const getTodoStore = (name = config.store.type): ITodoStore => todoStores[name] ?? unimplementedTodoStore;

const stores: Record<StoreType, IStateTodoStore> = {
  memory: memoryStateTodoStore,
  file: fileStateTodoStore,
  fileworker: fileWorkerStateTodoStore,
  db: dbStateTodoStore,
  mock: unimplementedStateTodoStore,
};

export const getStateTodoStore = (name = config.store.type): IStateTodoStore =>
  stores[name] ?? unimplementedStateTodoStore;

export const initStores = async () => {
  if (config.store.type === "db") {
    await initDb();
  }
};
