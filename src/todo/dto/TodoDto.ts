import { type StateTodoDto } from "../../stateTodo/dto/StateTodoDto";

export interface TodoDto {
  id: number;
  state: StateTodoDto;
  value: string;
}
