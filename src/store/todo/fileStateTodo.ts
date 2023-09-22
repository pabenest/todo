import { readFile } from "fs/promises";
import path from "path";

import { config } from "../../config";
import { type StateTodoModel } from "../../model/Todo";
import { type IStateTodoStore } from "./IStateTodoStore";

const STORE_FILE = path.resolve(config.rootPath, "src/store/todo/stateTodo.json");

const storeStateTodo = async (): Promise<StateTodoModel[]> => {
  try {
    return JSON.parse(await readFile(STORE_FILE, "utf-8")) as StateTodoModel[];
  } catch (error) {
    return [];
  }

  // Version promise simple
  // return readFile(STORE_FILE, "utf-8")
  //   .then(result => JSON.parse(result) as IStateTodo[])
  //   .catch(() => []);
};

// const saveStore = async (store: StateTodo[]): Promise<void> => {
//   await writeFile(STORE_FILE, JSON.stringify(store));
// };

export const fileStateTodoStore: IStateTodoStore = {
  async getDefault() {
    const store = await storeStateTodo();
    let stateTodo = store.find(x => x.isDefault === true);

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
  async getAll(): Promise<StateTodoModel[]> {
    return await storeStateTodo();
  },
};
