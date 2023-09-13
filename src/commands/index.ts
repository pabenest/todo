import { add } from "./add";
import { changeState } from "./changeState";
import { type ICommand } from "./ICommand";
import { list } from "./list";
import { remove } from "./remove";

export const commands: ICommand[] = [
  add,
  list,
  remove,
  changeState,
  {
    name: "exit",
    description: "Quitter l'application",
    run() {
      process.exit(0);
    },
  },
];
