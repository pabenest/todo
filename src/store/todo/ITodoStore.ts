import { type IStore } from "../../common/store/IStore";
import { type IStateTodo, type ITodo } from "../../model/Todo";

export interface ITodoStore extends IStore<ITodo> {
  changeState(newState: IStateTodo, todos: ITodo[]): Promise<void> | void;
}
