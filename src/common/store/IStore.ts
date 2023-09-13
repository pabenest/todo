export interface IStore<T> {
  add(instance: Omit<T, "id">): Promise<void> | void;
  getAll(): Promise<T[]> | T[];
  remove(id: number): Promise<void> | void;
}

export class unimplementedStore implements IStore<null> {
  add(instance: Omit<null, "id">): Promise<void> | void {
    throw new Error("Method not implemented.");
  }
  getAll(): null[] | Promise<null[]> {
    throw new Error("Method not implemented.");
  }
  remove(id: number): void {
    throw new Error("Method not implemented.");
  }
}
