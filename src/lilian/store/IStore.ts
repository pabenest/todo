import { type Todo } from "../model/Todo";

type CreateTodo = Omit<Todo, "id">;
export interface IStore {
  add(todo: CreateTodo): Promise<void> | void;
  getAll(): Promise<Todo[]> | Todo[];
  remove(id: number): Promise<void> | void;
  toggle(id: number): Promise<void> | void;
}
