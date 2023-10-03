import { type IStore } from "@common/store/IStore";
import { type TodoModel } from "@core/model/Todo";

export interface ITodoStore extends IStore<TodoModel> {
  changeState(newState: number, todos: number[]): Promise<void> | void;
  getTodoByStateTodo(state: number): Promise<TodoModel[]> | TodoModel[];
}
