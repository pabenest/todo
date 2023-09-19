import { isMainThread, Worker } from "worker_threads";

export class MyThread {
  constructor(
    public filename: URL | string,
    public tacheAsynchrone: () => void,
    public message?: (value: undefined) => void,
    public error?: (exitCode: number) => void,
    public exit?: (exitCode: number) => void,
  ) {}

  run(): void {
    if (isMainThread) {
      const worker = new Worker(this.filename, { workerData: "EN COURS", execArgv: ["--require", "ts-node/register"] });
      worker.on("message", msg => console.log(`Worker message received: ${msg}`));
      worker.on("error", err => console.error(err));
      worker.on("exit", code => {
        console.log(`Worker exited with code ${code}.`);
        //Quant on exit du thread secondaire, on exit le thread principal
        process.exit(0);
      });
    } else {
      console.log("Debut asynchrone");
      this.tacheAsynchrone();
      console.log("fin asynchrone");
      //On stoppe le le thread secondaire.
      process.exit(0);
    }
  }
}
