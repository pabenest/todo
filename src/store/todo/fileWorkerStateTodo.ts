import { Travailleur } from "../../common/Travailleur";
import { type StateTodoModel } from "../../model/Todo";
import { fileStateTodoStore } from "./fileStateTodo";
import { type IStateTodoStore } from "./IStateTodoStore";

const travailleur = new Travailleur(__filename, fileStateTodoStore);

export const fileWorkerStateTodoStore: IStateTodoStore = {
  async getDefault() {
    return travailleur.run("getDefault");
  },
  add(): Promise<void> {
    throw new Error("Method not implemented.");
  },
  remove(): Promise<void> {
    throw new Error("Method not implemented.");
  },
  async getAll(): Promise<StateTodoModel[]> {
    return await travailleur.run("getAll");
  },
};
