const { Worker } = require('worker_threads')

/** 
* Crée un worker
* @param file On donne à l'objet Worker le chemin d'accès au fichier contenant la tâche à exécuter en parallèle.
*/
function executeWorker (file) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(file)

    // Une fois le worker actif
    worker.on('online', () => { 
      console.log('DEBUT : Execution de la tâche intensive en parallèle') 
    })

    // Si un message est reçu du worker
    worker.on('message', workerMessage => {
      console.log(workerMessage)
      return resolve
    })

    worker.on('error', reject)
    worker.on('exit', code => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`))
      }
    })
  })
}

/**
 * Le main écrit dans la console
 */
async function prog () {

  // Tâche principale
  setInterval( () => { console.log('Tâche principale: la tâche en parallèle peut s\'exécuter') }, 1000)

  // Tâche en parallèle
  await executeWorker('./src/worker.js')
}

prog()
