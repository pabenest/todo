import { config } from "@common/config";
import { UnexpectedError } from "@common/error";
import { StateTodo } from "@core/db/entity/StateTodo";
import { type StateTodoModel } from "@core/model/Todo";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { dbStateTodoStore } from "./store/dbStateTodo";
import { fileStateTodoStore } from "./store/fileStateTodo";
import { fileWorkerStateTodoStore } from "./store/fileWorkerStateTodo";
import { type IStateTodoStore } from "./store/IStateTodoStore";
import { memoryStateTodoStore } from "./store/memoryStateTodo";

@Injectable()
export class StateTodoService implements IStateTodoStore {
  private readonly stateTodoStore: IStateTodoStore;

  constructor(@InjectRepository(StateTodo) private readonly todoRepository: Repository<StateTodo>) {
    switch (config.store.type) {
      case "db":
        this.stateTodoStore = dbStateTodoStore(todoRepository);
        break;
      case "memory":
        this.stateTodoStore = memoryStateTodoStore();
        break;
      case "file":
        this.stateTodoStore = fileStateTodoStore();
        break;
      case "fileworker":
        this.stateTodoStore = fileWorkerStateTodoStore();
        break;
      case "mock":
      default:
        throw new UnexpectedError("Type de store inconnu.");
    }
  }

  async getDefault() {
    return await this.stateTodoStore.getDefault();
  }
  async setDefault(id: number) {
    await this.stateTodoStore.setDefault(id);
  }
  async findOne(id: number) {
    console.log("test:");
    return await this.stateTodoStore.findOne(id);
  }

  async add(instance: Omit<StateTodoModel, "id">) {
    await this.stateTodoStore.add(instance);
  }
  async getAll() {
    return await this.stateTodoStore.getAll();
  }
  async remove(id: number) {
    await this.stateTodoStore.remove(id);
  }
}
