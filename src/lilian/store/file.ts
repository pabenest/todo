import { readFile, writeFile } from "fs/promises";

import { config } from "../config";
import { type Todo } from "../model/Todo";
import { type IStore } from "./IStore";

const STORE_FILE = config.store.filePath;
let index = 0;

const getStore = async (): Promise<Todo[]> => {
  try {
    return JSON.parse(await readFile(STORE_FILE, "utf-8")) as Todo[];
  } catch (error) {
    return [];
  }
};

const saveStore = async (store: Todo[]): Promise<void> => {
  await writeFile(STORE_FILE, JSON.stringify(store));
};

export const fileStore: IStore = {
  async add(todo) {
    const store = await getStore();
    store.push({ ...todo, id: index++ });
    await saveStore(store);
  },
  async getAll() {
    return await getStore();
  },
  async remove(id) {
    const store = await getStore();
    await saveStore(store.filter(todo => todo.id !== id));
  },
  async toggle(id) {
    const store = await getStore();
    store[id].done = !store[id].done;
    await saveStore(store);
  },
};
