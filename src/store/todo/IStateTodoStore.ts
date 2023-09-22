import { type IStore } from "../../common/store/IStore";
import { type StateTodoModel } from "../../model/Todo";

export interface IStateTodoStore extends IStore<StateTodoModel> {
  getDefault(): Promise<StateTodoModel> | StateTodoModel;
}
