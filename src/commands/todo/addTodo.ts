import { input } from "@inquirer/prompts";

import { type TodoModel } from "../../model/Todo";
import { getStateTodoStore, getTodoStore } from "../../store/todo";
import { type ICommand } from "../ICommand";

const todoStore = getTodoStore();
const stateTodoStore = getStateTodoStore();

export const addTodo: ICommand = {
  description: "Ajoute une tâche à la liste",
  name: "addTodo",
  async run() {
    const text = await input({ message: "Entrez votre tâche" });

    const todo = {
      id: -1,
      value: text,
      state: await stateTodoStore.getDefault(),
    } as TodoModel;

    await todoStore.add(todo);
  },
};
