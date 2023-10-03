import { ROOT_PATH } from "@common/config";
import { getIncrement } from "@common/model/WithId";
import { type StoreGetter } from "@common/store/IStore";
import { type TodoModel } from "@core/model/Todo";
import { readFile, writeFile } from "fs/promises";
import path from "path";

import { fileStateTodoStore } from "../../stateTodo/store/fileStateTodo";
import { type ITodoStore } from "./ITodoStore";

const STORE_FILE = path.resolve(ROOT_PATH, "src/store/todo/todo.json");

const getPersistTodo = async (): Promise<TodoModel[]> => {
  try {
    return JSON.parse(await readFile(STORE_FILE, "utf-8")) as TodoModel[];
  } catch (error) {
    return [];
  }
};

const saveStore = async (store: TodoModel[]): Promise<void> => {
  await writeFile(STORE_FILE, JSON.stringify(store, null, 2));
};

export const fileTodoStore = ((): ITodoStore => ({
  async findOne(id) {
    return (await this.getAll()).find(x => x.id === id) ?? null;
  },
  async add(todo) {
    const store = await this.getAll();
    const id = getIncrement(store);
    store.push({ ...todo, id });
    await saveStore(store);
  },
  async changeState(newState, todos) {
    const store = await this.getAll();
    if (store.length > 0 && newState && todos.length > 0) {
      for (const id of todos) {
        const tempTodo = await this.findOne(id);
        if (tempTodo) {
          const tempStateTodo = await fileStateTodoStore().findOne(tempTodo.state);
          if (tempStateTodo) {
            tempTodo.state = tempStateTodo.id;
          }
        }
      }
    }

    await saveStore(store);
  },
  async remove(id) {
    const store = await getPersistTodo();
    await saveStore(store.filter(todo => todo.id !== id));
  },
  async update(id, todo) {
    const store = await getPersistTodo();
    const index = store.findIndex(x => x.id === id);
    if (index !== -1) {
      store[index] = { ...store[index], ...todo };
      await saveStore(store);
    }
  },
  async getAll() {
    return await getPersistTodo();
  },
  async getTodoByStateTodoId(id) {
    const todos = await this.getAll();
    const list: TodoModel[] = [];
    for (const todo of todos) {
      if (todo.state === id) {
        list.push(todo);
      }
    }

    return list;
  },
})) satisfies StoreGetter<ITodoStore>;
