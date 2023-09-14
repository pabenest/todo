import { type WithId } from "../common/model/WithId";

export interface ITodo extends WithId {
  state: IStateTodo;
  value: string;
}
export interface IStateTodo extends WithId {
  isDefault: boolean;
  value: string;
}
