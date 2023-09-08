import { checkbox } from "@inquirer/prompts";

import { getStore } from "../store";
import { type ICommand } from "./ICommand";

const store = getStore();

export const remove: ICommand = {
  description: "Supprime une tâche à la liste",
  name: "remove",
  async run() {
    const todos = await store.getAll();

    const answers = await checkbox({
      message: "Quelles tâches voulez-vous supprimer ?",
      choices: todos.map(todo => ({
        name: todo.text,
        value: todo.id,
      })),
    });

    for (const id of answers) {
      await store.remove(id);
    }
  },
};
