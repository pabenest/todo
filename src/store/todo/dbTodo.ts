import { todoRepository } from "../../db/repo";
import { type StateTodoModel, type TodoModel } from "../../model/Todo";
import { type ITodoStore } from "./ITodoStore";

export const dbTodoStore: ITodoStore = {
  async add(todo: TodoModel) {
    await todoRepository.insert({
      state: {
        id: todo.state.id,
      },
      value: todo.value,
    });
  },
  async changeState(newState: StateTodoModel, todos: TodoModel[]) {
    await todoRepository.update(
      todos.map(todo => todo.id),
      { state: { id: newState.id } },
    );
  },
  async remove(id: number) {
    await todoRepository.delete(id);
  },
  async getAll() {
    return (
      await todoRepository.find({
        relations: {
          state: true,
        },
      })
    ).map(todo => ({
      id: todo.id,
      value: todo.value,
      state: {
        id: todo.state.id,
        value: todo.state.value,
        isDefault: todo.state.isDefault,
      },
    }));
  },
};
