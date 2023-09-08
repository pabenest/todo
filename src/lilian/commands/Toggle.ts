import { checkbox } from "@inquirer/prompts";

import { getStore } from "../store";
import { type ICommand } from "./ICommand";

const store = getStore();

export const toggle: ICommand = {
  description: "Marque une tâche comme terminée ou non",
  name: "toggle",
  async run() {
    const todos = await store.getAll();

    const answers = await checkbox({
      message: "Quelles tâches voulez-vous marquer comme terminée ou non ?",
      choices: todos.map(todo => ({
        name: todo.text,
        value: todo.id,
      })),
    });

    for (const id of answers) {
      await store.toggle(id);
    }
  },
};
