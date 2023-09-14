import { type IStateTodo } from "../../model/Todo";
import { type IStateTodoStore } from "./IStateTodoStore";

const storeStateTodo: IStateTodo[] = [
  { id: 1, value: "A faire", default: true },
  { id: 2, value: "A compléter", default: false },
  { id: 3, value: "Terminé", default: false },
];

export const memoryStateTodoStore: IStateTodoStore = {
  add() {
    throw new Error("Method not implemented.");
  },
  getAll(): IStateTodo[] {
    return [...storeStateTodo];
  },
  remove() {
    throw new Error("No Method not implemented.");
  },
  getDefault() {
    let stateTodo = storeStateTodo.find(x => x.default === true);

    if (stateTodo === undefined) {
      stateTodo = storeStateTodo[0];
    }
    return stateTodo;
  },
};
