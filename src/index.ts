import { input } from '@inquirer/prompts';
import checkbox, { Separator } from '@inquirer/checkbox';
import { select } from '@inquirer/prompts';
import { listenerCount } from 'process';
import { inflateRaw } from 'zlib';

let todos: Todo[] = [];


type EtatTodo = {
    value:number;
    name:string;
    description:string;
}

let etatTodos : EtatTodo[] = [
    {value:1, name:"A Faire", description:"Todo qui vient d\'être initiée"},
    {value:2, name:"A Completer", description:"Todo toujours en cours"},
    {value:3, name:"Terminé", description:"Todo qui est archivée"}
]

type Todo = {
    value:string;
    etat:EtatTodo;
}

type EntreeMenu  = {
    name:string;
    value:number;
    description:string;
}

let entreeLister : EntreeMenu[] = [{
    name:"Lister", 
    value:1,    
    description: 'lister la todolist'},
    {name:"Ajouter", 
    value:2,
    description: 'Ajouter une entrée'},
    {name:"Supprimer", 
    value:3,
    description: 'Supprimer une entrée'},
    {name:"changer l'état", 
    value:4,
    description: 'Changer l\'état d\'une ou plusieurs entrées'}
]

async function main() {
   
    while(true) {

        const answer = await select({
            message: 'Choix de la todo list',
            choices: entreeLister,
        });

        let entreeMenu = getEntreeMenu(answer);

          switch (entreeMenu.value) {
            case 1:
              lister()
              break;
            case 2:
                await ajouter()                           
                break;
            case 3:  
                await supprimer()
                break;
            case 4:  
                await changeEtat()
                break;    
            default:
              console.log(`Le choix :${answer} est impossible, veuillez taper 1, 2 ou 3.`);
          }
        }
}

main();


async function lister() {
    console.log("Lister " + texteTodos(todos));
}

 //PLutot utiliser Arrays.find
function getEntreeMenu(value : number) : EntreeMenu {

    let retour: EntreeMenu = entreeLister[0];

    for (let i = 0; i < entreeLister.length; i++) {
       if (entreeLister[i].value ==value) {
        retour = entreeLister[i];
        break;
       }
    }
    
    return retour
}

 //PLutot utiliser Arrays.find
function getTodo(value : string) : Todo {

    let retour: Todo = todos[0];

    for (let i = 0; i < todos.length; i++) {
       if (todos[i].value ==value) {
        retour = todos[i];
        break;
       }
    }
    
    return retour
}

 //PLutot utiliser Arrays.find
function getEtat(value : number) : EtatTodo {

    let retour: EtatTodo = etatTodos[0];

    for (let i = 0; i < etatTodos.length; i++) {
       if (etatTodos[i].value ==value) {
        retour = etatTodos[i];
        break;
       }
    }
    
    return retour
}

function texteTodos(todos: Todo[]) : string {
   
    return '[' + JSON.stringify(todos) +']'    
    //return '[' + todos.join('-') +']'
}

async function ajouter()
 {
    const param = await input({ message: 'Texte à ajouter:' });
    todos.push({value:param, etat:etatTodos[0]})
    //console.log('Ajouter ' + param);
 }

 async function supprimer()
 {
   
    let message : string = texteTodos(todos) + 'Texte à supprimer, donner son numéro: ';
    const del : string = await input({ message});
    
    let index : number = parseInt(del)

    if (isNaN(index)) {
        throw new Error("Le numéro renseigné n'est pas cohérent.")
    } else {



        todos.splice(index, 1)
    }

    todos.splice(index, 1)
       
 }

 async function changeEtat(){

        lister()

        //Choix du futur état 
        const choixEtat = await select({
            message: 'Choix du futur état',
            choices: etatTodos,
        });

        //Selection des Todos a modifier
        const choixTodos = await checkbox({
            message: 'Choix du futur état',
            choices: todosToChecboxType(todos),
        });

        sauvegardeEtat(choixEtat, choixTodos);
 }

 function sauvegardeEtat(futurEtat: number, todoValue :string[]) : void{

    //on retrouve l'état.
    let etat: EtatTodo = getEtat(futurEtat)
    //on retrouve les todos.
    for (let i = 0; i < todoValue.length; i++) {
       let todo : Todo = getTodo(todoValue[i])
       todo.etat = etat
    }  
 }

 //PLutot utiliser les map Arrays.map
 function todosToChecboxType(todos : Todo[]) : CheckboxType[] {

    let checkboxTypes :CheckboxType[] = [];

    for (let i = 0; i < todos.length; i++) {
        checkboxTypes[i] = {name:todos[i].value + ' ' + todos[i].etat.name, value:todos[i].value, disabled:false}
    }    

    return checkboxTypes
 }

 type CheckboxType = {
    name:string;
    value:string;
    disabled:boolean;
}
