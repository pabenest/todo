import { getTodoStore } from "../store/todo";
import { type ICommand } from "./ICommand";

const store = getTodoStore();

export const list: ICommand = {
  description: "Affiche la liste des tâches",
  name: "list",
  async run() {
    const todos = await store.getAll();

    // console.log(todos.map(todo => `${todo.done ? "✅" : "❌"} ${todo.text}`).join("\n"));
    console.table(todos);
  },
};
