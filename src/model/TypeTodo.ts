import { type TypeWithId } from "../common/model/TypeWithId";
import { type TypeWithValue } from "../common/model/TypeWithValue";

export interface TypeTodo extends TypeWithValue<string>, TypeWithId<number> {}
