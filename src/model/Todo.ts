import { type WithId } from "../common/model/WithId";

export interface TodoModel extends WithId {
  state: StateTodoModel;
  value: string;
}
export interface StateTodoModel extends WithId {
  isDefault: boolean;
  value: string;
}
