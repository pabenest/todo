import { select } from "@inquirer/prompts";

import { type StateTodoModel } from "../../model/Todo";
import { getStateTodoStore } from "../../store/todo";
import { type ICommand } from "../ICommand";

const stateTodoStore = getStateTodoStore();

export const changeStateDefault: ICommand = {
  description: "Choix de l'état par défaut",
  name: "changeStateDefault",
  async run() {
    const stateTodoBdds: StateTodoModel[] = await stateTodoStore.getAll();
    //Choix de l'état par défaut.
    const stateId: number = await select({
      message: "Choix du nouvel état",
      choices: stateTodoBdds.map(stateTodo => ({
        name: stateTodo.value,
        value: stateTodo.id,
      })),
    });

    await stateTodoStore.setDefault(stateId);
  },
};
