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

// const todos: Todo[] = [];

// // coucou
// const TRUE = true;

// interface TypeWithValue<T> {
//   value: T;
// }

// interface EtatTodo extends TypeWithValue<number> {
//   description: string;
//   name: string;
// }

// const etatTodos: EtatTodo[] = [
//   { value: 1, name: "A Faire", description: "Todo qui vient d'être initiée" },
//   { value: 2, name: "A Completer", description: "Todo toujours en cours" },
//   { value: 3, name: "Terminé", description: "Todo qui est archivée" },
// ];

// interface Todo extends TypeWithValue<string> {
//   etat: EtatTodo;
// }

// interface EntreeMenu extends TypeWithValue<number> {
//   description: string;
//   name: string;
// }

// const entreeLister: EntreeMenu[] = [
//   {
//     name: "Lister",
//     value: 1,
//     description: "lister la todolist",
//   },
//   { name: "Ajouter", value: 2, description: "Ajouter une entrée" },
//   { name: "Supprimer", value: 3, description: "Supprimer une entrée" },
//   { name: "changer l'état", value: 4, description: "Changer l'état d'une ou plusieurs entrées" },
// ];

// async function main() {
//   while (TRUE) {
//     const answer = await select({
//       message: "Choix de la todo list",
//       choices: entreeLister,
//     });

//     const entreeMenu = getEntreeMenu(answer);

//     switch (entreeMenu.value) {
//       case 1:
//         lister();
//         break;
//       case 2:
//         await ajouter();
//         break;
//       case 3:
//         await supprimer();
//         break;
//       case 4:
//         await changeEtat();
//         break;
//       default:
//         console.log(`Le choix :${answer} est impossible, veuillez taper 1, 2 ou 3.`);
//     }
//   }
// }

// void main();

// function lister() {
//   console.log("Lister " + texteTodos(todos));
// }

// function getEntreeMenu(value: number): EntreeMenu | null {
//   return entreeLister.find(x => x.value === value) ?? null;
// }

// function getTodo(value: string): Todo {
//   let retour: Todo;
//   const temp = todos.find(x => x.value === value);
//   if (temp === undefined) {
//     throw new Error("La liste ne contient pas l'entrée demandée.");
//   } else {
//     retour = temp;
//   }

//   return retour;
// }

// function getValue<T>(myElement: TypeWithValu<T>): EtatTodo {
//   let retour: EtatTodo;
//   const temp = etatTodos.find(x => x.value === myElement.value);
//   if (temp === undefined) {
//     throw new Error("La liste ne contient pas l'entrée demandée.");
//   } else {
//     retour = temp;
//   }

//   return retour;
// }

// function texteTodos(todos: Todo[]): string {
//   return "[" + JSON.stringify(todos) + "]";
//   //return '[' + todos.join('-') +']'
// }

// async function ajouter() {
//   const param = await input({ message: "Texte à ajouter:" });
//   todos.push({ value: param, etat: etatTodos[0] });
//   //console.log('Ajouter ' + param);
// }

// async function supprimer() {
//   const message: string = texteTodos(todos) + "Texte à supprimer, donner son numéro: ";
//   const del: string = await input({ message });

//   const index: number = parseInt(del);

//   if (isNaN(index)) {
//     throw new Error("Le numéro renseigné n'est pas cohérent.");
//   } else {
//     todos.splice(index, 1);
//   }

//   todos.splice(index, 1);
// }

// async function changeEtat() {
//   lister();

//   //Choix du futur état
//   const choixEtat = await select({
//     message: "Choix du futur état",
//     choices: etatTodos,
//   });

//   //Selection des Todos a modifier
//   const choixTodos = await checkbox({
//     message: "Choix du futur état",
//     choices: todosToChecboxType(todos),
//   });

//   // sauvegardeEtat(choixEtat, choixTodos);
// }

// // function sauvegardeEtat(futurEtat: number, todoValue: string[]): void {
// //   //on retrouve l'état.
// //   const etat: EtatTodo = getEtat(futurEtat);
// //   //on retrouve les todos.
// //   for (let i = 0; i < todoValue.length; i++) {
// //     const todo: Todo = getTodo(todoValue[i]);
// //     todo.etat = etat;
// //   }
// // }

// //PLutot utiliser les map Arrays.map
// function todosToChecboxType(todos: Todo[]): CheckboxType[] {
//   const checkboxTypes: CheckboxType[] = [];

//   for (let i = 0; i < todos.length; i++) {
//     checkboxTypes[i] = { name: todos[i].value + " " + todos[i].etat.name, value: todos[i].value, disabled: false };
//   }

//   return checkboxTypes;
// }

// interface CheckboxType {
//   disabled: boolean;
//   name: string;
//   value: string;
// }
