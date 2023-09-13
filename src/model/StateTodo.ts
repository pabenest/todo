import { type TypeWithId } from "../common/model/TypeWithId";
import { type TypeWithValue } from "../common/model/TypeWithValue";

export interface StateTodo extends TypeWithId<number>, TypeWithValue<string> {}
