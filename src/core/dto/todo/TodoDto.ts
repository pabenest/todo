import { type StateTodoDto } from "../statetodo/StateTodoDto";

export interface TodoDto {
  id: number;
  state: StateTodoDto;
  value: string;
}
