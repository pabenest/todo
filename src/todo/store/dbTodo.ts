import { UnexpectedError } from "@common/error";
import { type StoreGetter } from "@common/store/IStore";
import { type Todo } from "@core/db/entity/Todo";
import { type StateTodoModel, type TodoModel } from "@core/model/Todo";
import { type Repository } from "typeorm";

import { type ITodoStore } from "./ITodoStore";

export const dbTodoStore = ((todoRepository: Repository<Todo>) =>
  ({
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

    async getTodoByStateTodo(state) {
      if (state === undefined) {
        throw new UnexpectedError("Le paramètre ne peut pas être vide.");
      }

      const todos = await this.getAll();
      const list: TodoModel[] = [];
      for (const iterator of todos) {
        if (iterator.state.id === state.id) {
          list.push(iterator);
        }
      }

      return list;
    },
  }) as ITodoStore) satisfies StoreGetter<ITodoStore>;
