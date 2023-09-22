import { type ICommand } from "../ICommand";
import { add } from "./addTodo";
import { changeState } from "./changeStateTodo";
import { exposeConfig } from "./exposeConfig";
import { list } from "./listTodo";
import { remove } from "./remove";

export const commands: ICommand[] = [
  add,
  list,
  remove,
  changeState,
  exposeConfig,
  {
    name: "exit",
    description: "Quitter l'application",
    run() {
      process.exit(0);
    },
  },
];
