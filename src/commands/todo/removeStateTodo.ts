import { checkbox } from "@inquirer/prompts";

import { UnexpectedCommandError, UnexpectedError, UnexpectedRepositoryError } from "../../error";
import { getStateTodoStore } from "../../store/todo";
import { type ICommand } from "../ICommand";

const stateTodoStore = getStateTodoStore();

export const removeStateTodo: ICommand = {
  description: "Supprime un état de tâche à la liste",
  name: "removeStateTodo",
  async run() {
    const stateTodos = await stateTodoStore.getAll();

    const answers: number[] = await checkbox({
      message: "Quelles état de tâche voulez-vous supprimer ?",
      choices: stateTodos.map(stateTodo => ({
        name: stateTodo.value,
        value: stateTodo.id,
      })),
    });

    console.log(answers);
    for (const id of answers) {
      try {
        await getStateTodoStore().remove(id);
      } catch (e: unknown) {
        if (e instanceof UnexpectedRepositoryError) {
          console.warn("<ERREUR Repository>", e.message);
          console.info("More info:", e.appErrorStack());
        } else if (e instanceof Error) {
          throw new UnexpectedCommandError(`Erreur inconnue lors de la commande "remove".`, e);
        } else throw new UnexpectedError(`Erreur fatale lors de la commande "remove". (error: ${String(e)})`);
      }
    }
  },
};
