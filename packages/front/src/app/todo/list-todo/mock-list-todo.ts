import { type StateTodoModel, type TodoModel } from "../Todo";

export const TODOS: TodoModel[] = [
  { id: 1, state: 3, value: "toto" },
  { id: 2, state: 2, value: "tata" },
  { id: 3, state: 2, value: "titi" },
];

export const STATES: StateTodoModel[] = [
  { id: 1, isDefault: true, isEnd: false, isStart: true, value: "À faire" },
  { id: 87884, isDefault: false, isEnd: false, isStart: false, value: "À supprimer" },
  { id: 2, isDefault: false, isEnd: false, isStart: false, value: "En cours" },
  { id: 3, isDefault: false, isEnd: true, isStart: false, value: "Terminé" },
];
