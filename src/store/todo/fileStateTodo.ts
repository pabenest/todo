import { readFile } from "fs/promises";

import { config } from "../../config";
import { type IStateTodo, type StateTodo } from "../../model/Todo";
import { type IStateTodoStore } from "./IStateTodoStore";

const STORE_FILE = config.store.filePath + "/store/state-todo/stateTodo.json";

const storeStateTodo = async (): Promise<IStateTodo[]> => {
  try {
    console.log(STORE_FILE);

    // const state = JSON.parse(await readFile(STORE_FILE, "utf-8")) as IStateTodo[];
    // return state;
    return JSON.parse(await readFile(STORE_FILE, "utf-8")) as StateTodo[];
  } catch (error) {
    return [];
  }
};

// const saveStore = async (store: StateTodo[]): Promise<void> => {
//   await writeFile(STORE_FILE, JSON.stringify(store));
// };

export const fileStateTodoStore: IStateTodoStore = {
  async getDefault() {
    const store = await storeStateTodo();
    let stateTodo = store.find(x => x.default === true);

    if (stateTodo === undefined) {
      stateTodo = store[0];
    }
    return stateTodo;
  },
  add(): Promise<void> {
    throw new Error("Method not implemented.");
  },
  remove(): Promise<void> {
    throw new Error("Method not implemented.");
  },
  async getAll(): Promise<IStateTodo[]> {
    return await storeStateTodo();
  },
};
