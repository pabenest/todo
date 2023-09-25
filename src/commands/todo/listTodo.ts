import { getTodoStore } from "../../store/todo";
import { type ICommand } from "../ICommand";

const store = getTodoStore();

export const listTodo: ICommand = {
  description: "Affiche la liste des tâches",
  name: "listTodo",
  async run() {
    const todos = await store.getAll();
    console.clear();
    console.table(
      todos.map(todo => ({
        id: todo.id,
        value: todo.value,
        state: todo.state.value,
      })),
    );
  },
};
