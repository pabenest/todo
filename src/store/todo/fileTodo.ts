import { readFile, writeFile } from "fs/promises";
import path from "path";

import { getIncrement } from "../../common/model/WithId";
import { config } from "../../config";
import { type StateTodoModel, type TodoModel } from "../../model/Todo";
import { type ITodoStore } from "./ITodoStore";

const STORE_FILE = path.resolve(config.rootPath, "src/store/todo/todo.json");

const getPersist = async (): Promise<TodoModel[]> => {
  try {
    return JSON.parse(await readFile(STORE_FILE, "utf-8")) as TodoModel[];
  } catch (error) {
    return [];
  }
};

const saveStore = async (store: TodoModel[]): Promise<void> => {
  await writeFile(STORE_FILE, JSON.stringify(store, null, 2));
};

export const fileTodoStore: ITodoStore = {
  async add(todo: TodoModel): Promise<void> {
    const store = await this.getAll();
    const id = getIncrement(store);
    store.push({ ...todo, id });
    await saveStore(store);
  },
  async changeState(newState: StateTodoModel, todos: TodoModel[]): Promise<void> {
    const store = await this.getAll();
    if (store.length > 0 && newState && todos.length > 0) {
      for (const iterator of todos) {
        const todo = store.find(x => x.value === iterator.value) ?? null;
        if (todo) {
          todo.state = newState;
        }
      }
    }

    await saveStore(store);
  },
  async remove(id: number): Promise<void> {
    const store = await getPersist();
    await saveStore(store.filter(todo => todo.id !== id));
  },
  async getAll(): Promise<TodoModel[]> {
    return await getPersist();
  },
};
