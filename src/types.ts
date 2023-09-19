import { isMainThread, parentPort, Worker, workerData } from "worker_threads";

/**
 * Le main écrit dans la console
 */
function prog() {
  // Tâche principale
  setInterval(() => {
    console.log("Tâche principale: la tâche en parallèle peut s'exécuter");
  }, 1000);

  if (isMainThread) {
    const worker = new Worker(__filename, { workerData: "EN COURS", execArgv: ["--require", "ts-node/register"] });

    worker.on("message", msg => console.log(`Worker message received: ${msg}`));
    worker.on("error", err => console.error(err));
    worker.on("exit", code => {
      console.log(`Worker exited with code ${code}.`);
      process.exit(0);
    });

    worker.postMessage("coucou");
  } else {
    parentPort?.on("message", msg => console.log(`Parent Worker message received: ${msg}`));
    parentPort?.on("error", err => console.error(err));
    // Tâche en parallèle
    const data = workerData as string;
    parentPort?.postMessage("DEBUT");
    let count = 0;

    let interval = 10000000;
    for (let i = 0; i < 10000000000; i++) {
      count += 1;

      if (i == interval) {
        interval = interval + interval;
        parentPort?.postMessage(data + " " + count);
      }
    }
    const message = `FIN, total : ${count}`;

    // On renvoie un message depuis le worker récupérer lors du worker.on('message'...)
    parentPort?.postMessage(message);
    process.exit(0);
  }
}

void prog();

// function prog() {
//   // Tâche principale
//   setInterval(() => {
//     console.log("Tâche principale: la tâche en parallèle peut s'exécuter");
//   }, 1000);

//   const thread1 = new MyThread(__filename, () => {
//     // Tâche en parallèle
//     console.log("toto");
//     const data = workerData as string;
//     parentPort?.postMessage("DEBUT");
//     const max = 10000000000;

//     //On transmet un message de temps en temps, pendant le traitement long
//     const pas = 1000000000;
//     let interval = 0;
//     for (let i = 0; i < max; i++) {
//       if (i === interval) {
//         interval = interval + pas;
//         parentPort?.postMessage(data + " " + interval);
//       }
//     }
//     const message = `FIN, total : ${max}`;

//     // On renvoie un message depuis le worker récupérer lors du worker.on('message'...)
//     parentPort?.postMessage(message);
//   });

//   thread1.run();
// }

// void prog();
