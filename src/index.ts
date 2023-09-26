import "reflect-metadata";

import { select } from "@inquirer/prompts";

import { commands } from "./commands/todo";
import { AppError } from "./error";
import { initStores } from "./store/todo";

const TRUE = true;

async function main() {
  await initStores();
  while (TRUE) {
    const choice: string = await select({
      message: "Que voulez-vous faire ?",
      choices: commands.map(command => ({
        name: command.name,
        description: command.description,
        value: command.name,
      })),
    });
    console.clear();

    const command = commands.find(command => command.name === choice);

    try {
      await command?.run();
    } catch (e: unknown) {
      if (e instanceof AppError) {
        console.log("------ ERREUR ------", e.message);
      } else {
        console.error(e);
      }
    }
  }
}

void main();
