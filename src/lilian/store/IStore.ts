import { type Todo } from "../model/Todo";

type CreateTodo = Omit<Todo, "id">;
export interface IStore {
  add(todo: CreateTodo): Promise<void>;
  getAll(): Promise<Todo[]>;
  remove(id: number): Promise<void>;
  toggle(id: number): Promise<void>;
}
