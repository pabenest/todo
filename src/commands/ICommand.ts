export interface ICommand {
  description: string;
  name: string;
  run(): Promise<void> | void;
}
