import { ApiProperty } from "@nestjs/swagger";

export class ChangeStateDto {
  @ApiProperty() newState: number;
  @ApiProperty({ type: [Number] }) todos: number[];

  constructor(newState: number, todos: number[]) {
    this.newState = newState;
    this.todos = todos;
  }
}
