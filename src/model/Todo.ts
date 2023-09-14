import { type WithId } from "../common/model/WithId";

export interface ITodo extends WithId {
  state: IStateTodo;
  toString(): string;
  value: string;
}
export interface IStateTodo extends WithId {
  default: boolean;
  toString(): string;
  value: string;
}

export class StateTodo implements IStateTodo {
  default;
  value;
  id;

  constructor() {
    this.default = false;
    this.value = "";
    this.id = -1;
  }

  toString() {
    return this.value;
  }
}

export class Todo implements ITodo {
  state;
  value;
  id;

  constructor() {
    this.value = "";
    this.id = -1;
    this.state = new StateTodo();
  }

  toString() {
    return this.value;
  }
}
