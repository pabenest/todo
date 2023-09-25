import { checkbox } from "@inquirer/prompts";

import { getTodoStore } from "../../store/todo";
import { type ICommand } from "../ICommand";

const todoStore = getTodoStore();

export const removeTodo: ICommand = {
  description: "Supprime une tâche à la liste",
  name: "removeTodo",
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
      try {
        await todoStore.remove(id);
      } catch (e) {
        console.log(e);
      }
    }
  },
};
