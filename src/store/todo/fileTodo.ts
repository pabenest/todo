import { readFile, writeFile } from "fs/promises";

import { findId } from "../../common/model/WithId";
import { config } from "../../config";
import { type IStateTodo, type ITodo } from "../../model/Todo";
import { type ITodoStore } from "./ITodoStore";

const index = 0;
const STORE_FILE = config.store.filePath + "/store/todo/todo.json";

const getPersist = async (): Promise<ITodo[]> => {
  try {
    return JSON.parse(await readFile(STORE_FILE, "utf-8")) as ITodo[];
  } catch (error) {
    return [];
  }
};

const saveStore = async (store: ITodo[]): Promise<void> => {
  await writeFile(STORE_FILE, JSON.stringify(store));
};

export const fileTodoStore: ITodoStore = {
  async add(todo: ITodo): Promise<void> {
    const store = await this.getAll();
    const id: number = findId(store);
    store.push({ ...todo, id });
    await saveStore(store);
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

    await saveStore(store);
  },
  async remove(id: number): Promise<void> {
    const store = await getPersist();
    await saveStore(store.filter(todo => todo.id !== id));
  },
  async getAll(): Promise<ITodo[]> {
    return await getPersist();
  },
};
