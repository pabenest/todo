import { UnexpectedError } from "@common/error";
import { type StoreGetter } from "@common/store/IStore";
import { type Todo } from "@core/db/entity/Todo";
import { type TodoModel } from "@core/model/Todo";
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
    async findOne(id: number) {
      return await todoRepository.findOne({
        where: {
          id,
        },
      });
    },
    async changeState(id: number, todos: number[]) {
      await todoRepository.update(todos, { state: { id } });
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

    async getTodoByStateTodo(state: number) {
      if (state === undefined) {
        throw new UnexpectedError("Le paramètre ne peut pas être vide.");
      }

      const todos = await this.getAll();
      const list: TodoModel[] = [];
      for (const iterator of todos) {
        if (iterator.state.id === state) {
          list.push(iterator);
        }
      }

      return list;
    },
  }) as ITodoStore) satisfies StoreGetter<ITodoStore>;
