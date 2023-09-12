import { add } from "./Add";
import { type ICommand } from "./ICommand";
import { list } from "./List";
import { remove } from "./Remove";
import { toggle } from "./Toggle";

export const commands: ICommand[] = [
  add,
  list,
  remove,
  toggle,
  {
    name: "exit",
    description: "Quitter l'application",
    run() {
      process.exit(0);
    },
  },
];
