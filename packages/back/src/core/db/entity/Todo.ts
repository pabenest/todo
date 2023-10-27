import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { StateTodo } from "./StateTodo";

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => StateTodo, stateTodo => stateTodo.todos)
  state!: StateTodo;

  @Column("text")
  value!: string;
}
