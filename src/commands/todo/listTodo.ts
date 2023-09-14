import { type Todo } from "../../model/Todo";
import { getTodoStore } from "../../store/todo";
import { type ICommand } from "../ICommand";

const store = getTodoStore();

export const list: ICommand = {
  description: "Affiche la liste des tâches",
  name: "list",
  async run() {
    const todos: Todo[] = await store.getAll();
    // console.log(todos);
    // console.log(todos.map(todo => todo).join("\n"));
    console.table(todos, ["id", "value"]);
  },
};
