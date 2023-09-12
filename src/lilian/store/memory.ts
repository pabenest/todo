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
  },
  getAll() {
    return [...store];
  },
  remove(id) {
    store = store.filter(todo => todo.id !== id);
  },
  toggle(id) {
    store[id].done = !store[id].done;
  },
};
