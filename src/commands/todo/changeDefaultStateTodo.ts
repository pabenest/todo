import { select } from "@inquirer/prompts";

import { getStateTodoStore } from "../../store/todo";
import { type ICommand } from "../ICommand";

const stateTodoStore = getStateTodoStore();

export const changeStateDefault: ICommand = {
  description: "Choix de l'état par défaut",
  name: "changeStateDefault",
  async run() {
    const currentStates = await stateTodoStore.getAll();
    //Choix de l'état par défaut.
    const stateId = await select({
      message: "Choix du nouvel état",
      choices: currentStates.map(stateTodo => ({
        name: stateTodo.value,
        value: stateTodo.id,
      })),
    });

    await stateTodoStore.setDefault(stateId);
  },
};
