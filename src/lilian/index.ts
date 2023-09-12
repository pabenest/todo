import { select } from "@inquirer/prompts";

import { commands } from "./commands";

const TRUE = true;

async function main() {
  while (TRUE) {
    const choice = await select({
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
