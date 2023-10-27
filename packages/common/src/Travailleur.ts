import { isMainThread, type MessagePort, parentPort, Worker } from "worker_threads";

/**
 * Message venant du Main en direction du Worker
 */
interface DefaultTravailleurMessage {
  command: string;
  input?: unknown;
}

type ConfigInputs<TConfig, TCommand extends keyof TConfig> = TConfig[TCommand] extends (
  ...inputs: infer TInput
) => unknown
  ? TInput
  : never;

type ConfigOutput<TConfig, TCommand extends keyof TConfig> = TConfig[TCommand] extends (
  ...args: unknown[]
) => infer TOutput
  ? TOutput
  : never;

type UnboxPromise<T> = T extends Promise<infer U> ? UnboxPromise<U> : T;

export class Travailleur<TConfig> {
  private static assertInWorker(parentPort_: MessagePort | null): asserts parentPort_ is MessagePort {
    if (parentPort === null || isMainThread) throw new Error("Should be in worker");
  }

  private static assertWorkingWorker(worker: Worker | null): asserts worker is Worker {
    if (worker === null || !isMainThread) throw new Error("Worker is not working");
  }

  private main_currentWorker: Worker | null = null;

  public constructor(
    filename: string,
    private worker_instance: TConfig,
  ) {
    if (isMainThread) {
      this.main_currentWorker = new Worker(filename, { execArgv: ["--require", "ts-node/register"] });
      this.main_currentWorker.on("error", error => {
        console.warn("💀 Worker error", error);
      });
      this.main_currentWorker.on("exit", code => {
        console.log(`Worker stopped with exit code ${code}`);
      });
    } else {
      Travailleur.assertInWorker(parentPort);
      // Coeur principal du Worker
      parentPort.on("message", (message: DefaultTravailleurMessage) => {
        const configMethod = this.worker_instance[message.command as keyof TConfig] as (
          ...message: unknown[]
        ) => Promise<unknown>;
        void (async () => {
          const response = await configMethod.apply(this.worker_instance, message.input as unknown[]);
          this.postMessage(response);
        })();
      });
    }
  }

  private postMessage(message: unknown) {
    if (isMainThread) {
      Travailleur.assertWorkingWorker(this.main_currentWorker);
      this.main_currentWorker.postMessage(message);
    } else {
      Travailleur.assertInWorker(parentPort);
      parentPort.postMessage(message);
    }
  }

  /**
   * Coeur principal du Main
   */
  public run<TCommand extends keyof TConfig, TOutput extends UnboxPromise<ConfigOutput<TConfig, TCommand>>>(
    command: TCommand,
    ...input: ConfigInputs<TConfig, TCommand>
  ): Promise<TOutput> {
    Travailleur.assertWorkingWorker(this.main_currentWorker);
    return new Promise<TOutput>((resolve, reject) => {
      Travailleur.assertWorkingWorker(this.main_currentWorker);
      this.main_currentWorker.once("message", resolve);
      this.main_currentWorker.once("error", reject);
      this.postMessage({
        command,
        input,
      });
    });
  }

  public onGlobalError(callback: (error: Error) => void) {
    Travailleur.assertWorkingWorker(this.main_currentWorker);
    this.main_currentWorker.on("error", callback);
  }
}
