import { type IStore } from "../../common/store/IStore";
import { type StateTodo } from "../../model/StateTodo";

export interface IStateTodoStore extends IStore<StateTodo> {
  getDefault(): Promise<StateTodo> | StateTodo;
}
