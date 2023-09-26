import { checkbox, select } from "@inquirer/prompts";

import { getStateTodoStore, getTodoStore } from "../../store/todo";
import { type ICommand } from "../ICommand";

const stateTodoStore = getStateTodoStore();
const todoStore = getTodoStore();

export const removeStateTodo: ICommand = {
  description: "Supprime un état de tâche à la liste",
  name: "removeStateTodo",
  async run() {
    const stateTodos = await stateTodoStore.getAll();

    const answers = await checkbox({
      message: "Quelles état de tâche voulez-vous supprimer ?",
      choices: stateTodos.map(stateTodo => ({
        name: stateTodo.value,
        value: stateTodo,
      })),
    });

    console.log(answers);
    for (const stateTodo of answers) {
      const refs = await todoStore.getTodoByStateTodo(stateTodo);

      let cascade = "oui";
      if (refs.length > 0) {
        cascade = await select({
          message:
            "L'état de tache est lié à des todos, ceci entrainera la suppression des todos associés. Voulez-vous vraiment continuer ?",
          choices: [{ value: "oui" }, { value: "non" }],
        });
      }

      if (cascade === "oui") {
        try {
          for (const todo of refs) {
            await getTodoStore().remove(todo.id);
          }
          await getStateTodoStore().remove(stateTodo.id);
        } catch (e) {
          console.log(e);
        }
      }
    }
  },
};
