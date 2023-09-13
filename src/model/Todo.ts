import { type TypeWithId } from "../common/model/TypeWithId";
import { type TypeWithValue } from "../common/model/TypeWithValue";
import { type StateTodo } from "./StateTodo";

export interface Todo extends TypeWithValue<string>, TypeWithId<number> {
  state: StateTodo;
}
