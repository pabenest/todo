import { input } from "@inquirer/prompts";

import { getStore } from "../store";
import { type ICommand } from "./ICommand";

const store = getStore();

export const add: ICommand = {
  description: "Ajoute une tâche à la liste",
  name: "add",
  async run() {
    const text = await input({ message: "Entrez votre tâche" });
    await store.add({ done: false, text });
  },
};
