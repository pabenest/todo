export interface IStore<T> {
  add(instance: Omit<T, "id">): Promise<void> | void;
  getAll(): Promise<T[]> | T[];
  remove(id: number): Promise<void> | void;
}
