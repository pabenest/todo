import { type IStore } from "../../common/store/IStore";
import { type IStateTodo } from "../../model/Todo";

export interface IStateTodoStore extends IStore<IStateTodo> {
  getDefault(): IStateTodo | Promise<IStateTodo>;
}
