import { type IStateTodo, type ITodo } from "../../model/Todo";
import { Travailleur } from "../../Travailleur";
import { fileTodoStore } from "./fileTodo";
import { type ITodoStore } from "./ITodoStore";

const travailleur = new Travailleur(__filename, fileTodoStore);

export const fileWorkerTodoStore: ITodoStore = {
  async add(todo: ITodo): Promise<void> {
    await travailleur.run("add", todo);
  },

  async changeState(newState: IStateTodo, todos: ITodo[]): Promise<void> {
    await travailleur.run("changeState", newState, todos);
  },
  async remove(id: number): Promise<void> {
    await travailleur.run("remove", id);
  },
  async getAll(): Promise<ITodo[]> {
    return await travailleur.run("getAll");
  },
};
