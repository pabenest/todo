import { input } from "@inquirer/prompts";

import { type Todo } from "../model/Todo";
import { getStateTodoStore } from "../store/stateTodo";
import { getTodoStore } from "../store/todo";
import { type ICommand } from "./ICommand";

const todoStore = getTodoStore();
const stateTodoStore = getStateTodoStore();

export const add: ICommand = {
  description: "Ajoute une tâche à la liste",
  name: "add",
  async run() {
    const text = await input({ message: "Entrez votre tâche" });

    const todo = {
      id: 2,
      value: text,
      state: stateTodoStore.getDefault(),
    } as Todo;

    await todoStore.add(todo);
  },
};
