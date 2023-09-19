import path from "path";

import { config } from "../../config";
import { type IStateTodo } from "../../model/Todo";

const { parentPort } = require("worker_threads");
const { readFile } = require("fs/promises");

const STORE_FILE = path.resolve(config.rootPath, "src/store/todo/stateTodo.json");

const fichier1 = JSON.parse(readFile(STORE_FILE, "utf-8")) as IStateTodo[];

// On renvoie un message depuis le worker récupérer lors du worker.on('message'...)
parentPort?.postMessage(fichier1);
