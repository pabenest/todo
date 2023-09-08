import { type config } from "../config";
import { type IStore } from "./IStore";
import { memoryStore } from "./memory";

export type StoreType = typeof config.storeType;
const stores: Record<StoreType, IStore> = {
  memory: memoryStore,
  // file: fileStore,
  // db: dbStore,
};

export const getStore = (name = "memory" as StoreType): IStore => stores[name];
