import { type IStore } from "../../common/store/IStore";
import { type Todo } from "../../model/Todo";
import { type TypeTodo } from "../../model/TypeTodo";

export interface ITodoStore extends IStore<Todo> {
  changeState(newState: TypeTodo, todos: TypeTodo[]): Promise<void> | void;
}
