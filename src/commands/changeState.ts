import { checkbox, select } from "@inquirer/prompts";

import { type StateTodo } from "../model/StateTodo";
import { type Todo } from "../model/Todo";
import { getStateTodoStore } from "../store/stateTodo";
import { getTodoStore } from "../store/todo";
import { type ICommand } from "./ICommand";

const todoStore = getTodoStore();
const stateTodoStore = getStateTodoStore();

export const changeState: ICommand = {
  description: "Changer l'état de certains Todos",
  name: "changeState",
  async run() {
    const todoBdds = await todoStore.getAll();
    const stateTodoBdds: StateTodo[] = await stateTodoStore.getAll();

    //Choix du futur état
    const newStateId = await select({
      message: "Choix du nouvel état",
      choices: stateTodoBdds.map(stateTodo => ({
        name: stateTodo.value,
        value: stateTodo.id,
      })),
    });

    const stateTodo = stateTodoBdds.find(x => x.id === newStateId);

    if (stateTodo) {
      const newTodoIds: number[] = await checkbox({
        message: "Quelles tâches voulez-vous marquer comme terminée ou non ?",
        choices: todoBdds.map(todo => ({
          name: todo.value,
          value: todo.id,
        })),
      });

      const todos: Todo[] = [];

      if (newTodoIds) {
        for (const newTodoId of newTodoIds) {
          const todo = todoBdds.find(x => x.id === newTodoId);
          if (todo) {
            todos.push(todo);
          }
        }
      }

      await todoStore.changeState(stateTodo, todos);
    }
  },
};
