// const { path } = require("path");
// const { config } = require("../../config");
// const { ITodo } = require("../../model/Todo");

const { parentPort } = require("worker_threads");
const { readFile } = require("fs/promises");

//const STORE_FILE = path.resolve(config.rootPath, "src/store/todo/todo.json");

const fichier1 = JSON.parse(readFile("/home/paben/source/todo/src/store/todo/todo.json", "utf-8"));

// On renvoie un message depuis le worker récupérer lors du worker.on('message'...)
parentPort?.postMessage(fichier1);
