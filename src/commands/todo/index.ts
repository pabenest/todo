import { type ICommand } from "../ICommand";
import { addStateTodo } from "./addStateTodo";
import { addTodo } from "./addTodo";
import { changeStateDefault } from "./changeDefaultStateTodo";
import { changeState } from "./changeStateTodo";
import { exposeConfig } from "./exposeConfig";
import { listStateTodo } from "./listStateTodo";
import { listTodo } from "./listTodo";
import { removeStateTodo } from "./removeStateTodo";
import { removeTodo } from "./removeTodo";

export const commands: ICommand[] = [
  addTodo,
  listTodo,
  removeTodo,
  changeState,
  addStateTodo,
  listStateTodo,
  removeStateTodo,
  changeStateDefault,
  exposeConfig,
  {
    name: "exit",
    description: "Quitter l'application",
    run() {
      process.exit(0);
    },
  },
];
