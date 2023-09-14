import { input } from "@inquirer/prompts";

import { type ITodo } from "../../model/Todo";
import { getStateTodoStore, getTodoStore } from "../../store/todo";
import { type ICommand } from "../ICommand";

const todoStore = getTodoStore();
const stateTodoStore = getStateTodoStore();

export const add: ICommand = {
  description: "Ajoute une tâche à la liste",
  name: "add",
  async run() {
    const text = await input({ message: "Entrez votre tâche" });

    const todo = {
      id: -1,
      value: text,
      state: await stateTodoStore.getDefault(),
    } as ITodo;

    await todoStore.add(todo);
  },
};
