import { type Todo } from "../model/Todo";
import { type IStore } from "./IStore";

let store: Todo[] = [];
let index = 0;

export const memoryStore: IStore = {
  add(todo) {
    store.push({
      ...todo,
      id: index++,
    });
    return Promise.resolve();
  },
  getAll() {
    return Promise.resolve([...store]);
  },
  remove(id) {
    store = store.filter(todo => todo.id !== id);
    return Promise.resolve();
  },
  toggle(id) {
    store[id].done = !store[id].done;
    return Promise.resolve();
  },
};
