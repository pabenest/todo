import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AppError } from "@todo-pabenest/common";
import { Repository } from "typeorm";

import { StateTodo } from "../core/db/entity/StateTodo";
import { type StateTodoModel } from "../core/model/Todo";

@Injectable()
export class StateTodoService {
  constructor(@InjectRepository(StateTodo) private readonly stateTodoRepository: Repository<StateTodo>) {}

  async getDefault() {
    const defaultState = await this.stateTodoRepository.findOne({ where: { isDefault: true } });
    if (!defaultState) throw new Error("No default state found. Please seed the database.");

    return {
      id: defaultState.id,
      value: defaultState.value,
      isDefault: true,
      isStart: defaultState.isStart,
      isEnd: defaultState.isEnd,
    };
  }
  async setDefault(id: number) {
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
      await this.stateTodoRepository.save(stateTodos);
    } else {
      throw new AppError("L'identifiant de l'état n'existe pas.");
    }
  }
  async findOne(id: number) {
    return this.stateTodoRepository.findOne({
      where: {
        id,
      },
    });
  }

  async add(stateTodo: Omit<StateTodoModel, "id">) {
    // TODO: check if default is true, if true, set others to false or throw error
    await this.stateTodoRepository.insert({
      value: stateTodo.value,
      isDefault: stateTodo.isDefault,
      isEnd: false,
      isStart: false,
    });
  }
  async getAll() {
    const entities = await this.stateTodoRepository.find();
    return entities.map(x => ({
      id: x.id,
      value: x.value,
      isDefault: x.isDefault,
      isStart: x.isStart,
      isEnd: x.isEnd,
    }));
  }
  async update(id: number, stateTodo: Partial<Omit<StateTodoModel, "id">>) {
    const stateTodos = await this.getAll();
    // if instance.isDefault = false et qu'il était à true, on doit throw une erreur
    // if instance.isDefault = true et qu'il était à false, on doit mettre à false les autres
    // if instance.isDefault = undefined, on update normalement

    if (stateTodo.isDefault === false) {
      const stateTodo = stateTodos.find(stateTodo => stateTodo.id === id);
      if (stateTodo?.isDefault === true) {
        throw new AppError("Can't set default to false on default state");
      }
      // fallback cas normal
    } else if (stateTodo.isDefault === true) {
      for (const currentStateTodo of stateTodos) {
        if (currentStateTodo.id !== id) {
          await this.stateTodoRepository.update(id, {
            isDefault: false,
          });
        }
      }
      // on continue cas normal
    }

    //TODO: check isStart and isEnd are not both true

    // -------- cas normal
    await this.stateTodoRepository.update(id, stateTodo);
  }
  async remove(id: number) {
    const stateTodo = await this.stateTodoRepository.findOneOrFail({
      where: { id },
    });

    console.log("id a supp" + id);
    await this.stateTodoRepository.remove(stateTodo);
  }
}
