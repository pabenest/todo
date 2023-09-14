import { checkbox } from "@inquirer/prompts";

import { getTodoStore } from "../../store/todo";
import { type ICommand } from "../ICommand";

const todoStore = getTodoStore();

export const remove: ICommand = {
  description: "Supprime une tâche à la liste",
  name: "remove",
  async run() {
    const todos = await todoStore.getAll();

    const answers: number[] = await checkbox({
      message: "Quelles tâches voulez-vous supprimer ?",
      choices: todos.map(todo => ({
        name: todo.value,
        value: todo.id,
      })),
    });

    console.log(answers);
    for (const id of answers) {
      await todoStore.remove(id);
    }
  },
};
