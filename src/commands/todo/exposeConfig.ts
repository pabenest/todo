import { inspect } from "util";

import { config } from "../../config";
import { type ICommand } from "../ICommand";

export const exposeConfig: ICommand = {
  description: "Voir la configuration",
  name: "config",
  run() {
    console.clear();
    console.log(inspect(config, true, Infinity, true));
  },
};
