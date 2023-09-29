import { type IStore } from "@common/store/IStore";
import { type StateTodoModel, type TodoModel } from "@core/model/Todo";

export interface ITodoStore extends IStore<TodoModel> {
  changeState(newState: StateTodoModel, todos: TodoModel[]): Promise<void> | void;
  getTodoByStateTodo(state: StateTodoModel): Promise<TodoModel[]> | TodoModel[];
}
