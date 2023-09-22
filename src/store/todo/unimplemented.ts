import { unimplemented } from "../../common/utils";
import { type IStateTodoStore } from "./IStateTodoStore";
import { type ITodoStore } from "./ITodoStore";

export const unimplementedTodoStore: ITodoStore = {
  changeState: unimplemented,
  add: unimplemented,
  getAll: unimplemented,
  remove: unimplemented,
};

export const unimplementedStateTodoStore: IStateTodoStore = {
  add: unimplemented,
  getAll: unimplemented,
  remove: unimplemented,
  getDefault: unimplemented,
};
