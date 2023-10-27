import { type WithId } from "@todo-pabenest/common";

export interface TodoModel extends WithId {
  state: number;
  value: string;
}
export interface StateTodoModel extends WithId {
  isDefault: boolean;
  isEnd: boolean;
  isStart: boolean;
  value: string;
}
