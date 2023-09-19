import path from "path";
import { Worker } from "worker_threads";

import { config } from "../../config";
import { type IStateTodo } from "../../model/Todo";
import { type IStateTodoStore } from "./IStateTodoStore";

const WORKER_STATE_TODO_READ = path.resolve(config.rootPath, "src/store/todo/readFileStateTodo.ts");

const getPersist = async (): Promise<IStateTodo[]> => {
  // Tâche en parallèle
  return await executeLoad();
};

// const saveStore = async (store: StateTodo[]): Promise<void> => {
//   await writeFile(STORE_FILE, JSON.stringify(store));
// };

export const fileWorkerThreadStateTodoStore: IStateTodoStore = {
  async getDefault() {
    const store = await this.getAll();
    let stateTodo = store.find(x => x.isDefault === true);

    if (stateTodo === undefined) {
      stateTodo = store[0];
    }
    return stateTodo;
  },
  add(): Promise<void> {
    throw new Error("Method not implemented.");
  },
  remove(): Promise<void> {
    throw new Error("Method not implemented.");
  },
  async getAll(): Promise<IStateTodo[]> {
    return await getPersist();
  },
};

function executeLoad(): Promise<IStateTodo[]> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(WORKER_STATE_TODO_READ);

    // Une fois le worker actif
    worker.on("online", () => {
      console.log("DEBUT : Execution de la tâche intensive en parallèle");
    });

    // Si un message est reçu du worker
    worker.on("message", workerMessage => {
      console.log(workerMessage);
      return resolve;
    });

    worker.on("error", reject);
    worker.on("exit", code => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });
  });
}
