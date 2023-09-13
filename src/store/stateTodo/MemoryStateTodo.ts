import { type StateTodo } from "../../model/StateTodo";
import { type IStateTodoStore } from "./IStateTodoStore";

const storeStateTodo: StateTodo[] = [
  { id: 1, value: "A Faire" },
  { id: 2, value: "A commpleter" },
  { id: 3, value: "A terminé" },
];

export const memoryTypeTodoStore: IStateTodoStore = {
  add(instance) {
    throw new Error("Method not implemented.");
  },
  getAll(): StateTodo[] {
    return [...storeStateTodo];
  },
  remove(id) {
    throw new Error("No Method not implemented.");
  },
  getDefault() {
    return storeStateTodo[0];
  },
};
