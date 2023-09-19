import { readFile } from "fs/promises";
import path from "path";

import { getIncrement } from "../../common/model/WithId";
import { config } from "../../config";
import { type IStateTodo, type ITodo } from "../../model/Todo";
import { type ITodoStore } from "./ITodoStore";
import { MyThread } from "./MyThread";

const STORE_FILE = path.resolve(config.rootPath, "src/store/todo/todo.json");

const getPersist = async (): Promise<ITodo[]> => {
  // Tâche en parallèle
  return await executeLoad();
};

export const fileWorkerThreadTodoStore: ITodoStore = {
  async add(todo: ITodo): Promise<void> {
    const store = await this.getAll();
    const id = getIncrement(store);
    store.push({ ...todo, id });
    await executeSave(store);
  },
  async changeState(newState: IStateTodo, todos: ITodo[]): Promise<void> {
    const store = await this.getAll();
    if (store.length > 0 && newState && todos.length > 0) {
      for (const iterator of todos) {
        const todo = store.find(x => x.value === iterator.value) ?? null;
        if (todo) {
          todo.state = newState;
        }
      }
    }

    await executeSave(store);
  },
  async remove(id: number): Promise<void> {
    const store = await getPersist();
    await executeSave(store.filter(todo => todo.id !== id));
  },
  async getAll(): Promise<ITodo[]> {
    return await getPersist();
  },
};

function executeLoad(): Promise<ITodo[]> {
  return new Promise(async (resolve, reject) => {
    const workerLoad = new MyThread(__filename, async () => {
      try {
        return JSON.parse(await readFile(STORE_FILE, "utf-8")) as ITodo[];
      } catch (error) {
        return [];
      }
    });
    workerLoad.run();

    resolve();
    reject();
  });
}

function executeSave(todos: ITodo[]): Promise<ITodo[]> {}
