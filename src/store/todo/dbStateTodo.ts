import { stateTodoRepository } from "../../db/repo";
import { type IStateTodoStore } from "./IStateTodoStore";

export const dbStateTodoStore: IStateTodoStore = {
  add() {
    throw new Error("Method not implemented.");
  },
  async getAll() {
    const entities = await stateTodoRepository.find();

    return entities.map(x => ({ id: x.id, value: x.value, isDefault: x.isDefault }));
  },
  remove() {
    throw new Error("No Method not implemented.");
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
};
