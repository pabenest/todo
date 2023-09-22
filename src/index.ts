import "reflect-metadata";

import { select } from "@inquirer/prompts";

import { commands } from "./commands/todo";
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

    await command?.run();
  }
}

void main();
