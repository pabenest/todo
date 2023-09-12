import { config, type StoreType } from "../config";
import { fileStore } from "./file";
import { type IStore } from "./IStore";
import { memoryStore } from "./memory";

const unimplementedStore: IStore = {
  add() {
    throw new Error("Unimplemented");
  },
  getAll() {
    throw new Error("Unimplemented");
  },
  remove() {
    throw new Error("Unimplemented");
  },
  toggle() {
    throw new Error("Unimplemented");
  },
};

const stores: Record<StoreType, IStore> = {
  memory: memoryStore,
  file: fileStore,
  // TODO: Implement the other stores
  db: unimplementedStore,
  mock: unimplementedStore,
};

export const getStore = (name = config.store.type): IStore => stores[name] ?? unimplementedStore;
