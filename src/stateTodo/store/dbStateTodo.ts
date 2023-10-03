import { AppError } from "@common/error";
import { type StoreGetter } from "@common/store/IStore";
import { type StateTodo } from "@core/db/entity/StateTodo";
import { type Repository } from "typeorm";

import { type IStateTodoStore } from "./IStateTodoStore";

export const dbStateTodoStore = ((stateTodoRepository: Repository<StateTodo>) =>
  ({
    async add(stateTodo) {
      await stateTodoRepository.insert({
        value: stateTodo.value,
        isDefault: stateTodo.isDefault,
      });
    },
    async findOne(id: number) {
      return await stateTodoRepository.findOne({
        where: {
          id,
        },
      });
    },
    async getAll() {
      const entities = await stateTodoRepository.find();
      return entities.map(x => ({ id: x.id, value: x.value, isDefault: x.isDefault }));
    },
    async remove(id) {
      console.log("id a supp" + id);
      const stateTodo = await stateTodoRepository.findOneOrFail({
        where: { id },
      });

      console.log("id a supp" + id);
      await stateTodoRepository.remove(stateTodo);
    },
    async getDefault() {
      const defaultState = await stateTodoRepository.findOne({ where: { isDefault: true } });
      if (!defaultState) throw new Error("No default state found. Please seed the database.");

      return {
        id: defaultState.id,
        value: defaultState.value,
        isDefault: true,
      };
    },
    async setDefault(id) {
      const stateTodos = await this.getAll();
      const hasStateTodo = stateTodos.find(stateTodo => stateTodo.id === id);
      if (hasStateTodo) {
        //les autres ne sont plus par défaut.
        for (const stateTodo of stateTodos) {
          if (stateTodo.id !== id) {
            stateTodo.isDefault = false;
          } else {
            stateTodo.isDefault = true;
          }
        }
        await stateTodoRepository.save(stateTodos);
      } else {
        throw new AppError("L'identifiant de l'état n'existe pas.");
      }
    },
  }) as IStateTodoStore) satisfies StoreGetter<IStateTodoStore>;
