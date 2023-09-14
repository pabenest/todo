import { getTodoStore } from "../../store/todo";
import { type ICommand } from "../ICommand";

const store = getTodoStore();

export const list: ICommand = {
  description: "Affiche la liste des tâches",
  name: "list",
  async run() {
    const todos = await store.getAll();
    console.table(
      todos.map(todo => ({
        id: todo.id,
        value: todo.value,
        state: todo.state.value,
      })),
    );
  },
};
