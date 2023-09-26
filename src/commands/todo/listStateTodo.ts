import { getStateTodoStore } from "../../store/todo";
import { type ICommand } from "../ICommand";

const store = getStateTodoStore();

export const listStateTodo: ICommand = {
  description: "Affiche la liste des états de tâche",
  name: "listStateTodo",
  async run() {
    const stateTodos = await store.getAll();
    console.clear();
    console.table(
      stateTodos.map(stateTodo => ({
        id: stateTodo.id,
        value: stateTodo.value,
        default: stateTodo.isDefault,
      })),
    );
  },
};
