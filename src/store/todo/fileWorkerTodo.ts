import { Travailleur } from "../../common/Travailleur";
import { type StateTodoModel, type TodoModel } from "../../model/Todo";
import { fileTodoStore } from "./fileTodo";
import { type ITodoStore } from "./ITodoStore";

const travailleur = new Travailleur(__filename, fileTodoStore);

export const fileWorkerTodoStore: ITodoStore = {
  async add(todo: TodoModel): Promise<void> {
    await travailleur.run("add", todo);
  },

  async changeState(newState: StateTodoModel, todos: TodoModel[]): Promise<void> {
    await travailleur.run("changeState", newState, todos);
  },
  async remove(id: number): Promise<void> {
    await travailleur.run("remove", id);
  },
  async getAll(): Promise<TodoModel[]> {
    return await travailleur.run("getAll");
  },
};
