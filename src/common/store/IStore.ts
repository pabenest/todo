import { type Any } from "@common/types";

export interface IStore<T> {
  add(instance: Omit<T, "id">): Promise<void> | void;
  getAll(): Promise<T[]> | T[];
  remove(id: number): Promise<void> | void;
}

export type StoreGetter<TStore extends IStore<unknown>> = (...args: Any[]) => TStore;
