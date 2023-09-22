import { type StateTodoModel } from "../../model/Todo";
import { type IStateTodoStore } from "./IStateTodoStore";

const storeStateTodo: StateTodoModel[] = [
  { id: 1, value: "A faire", isDefault: true },
  { id: 2, value: "A compléter", isDefault: false },
  { id: 3, value: "Terminé", isDefault: false },
];

export const memoryStateTodoStore: IStateTodoStore = {
  add() {
    throw new Error("Method not implemented.");
  },
  getAll(): StateTodoModel[] {
    return [...storeStateTodo];
  },
  remove() {
    throw new Error("No Method not implemented.");
  },
  getDefault() {
    let stateTodo = storeStateTodo.find(x => x.isDefault === true);

    if (stateTodo === undefined) {
      stateTodo = storeStateTodo[0];
    }
    return stateTodo;
  },
};
