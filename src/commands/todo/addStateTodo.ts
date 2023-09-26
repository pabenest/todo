import { input } from "@inquirer/prompts";

import { getStateTodoStore } from "../../store/todo";
import { type ICommand } from "../ICommand";

const stateTodoStore = getStateTodoStore();

export const addStateTodo: ICommand = {
  description: "Ajoute une tâche à la liste",
  name: "addStateTodo",
  async run() {
    const text = await input({ message: "Entrez votre état de tâche" });

    await stateTodoStore.add({
      value: text,
      isDefault: false,
    });
  },
};
