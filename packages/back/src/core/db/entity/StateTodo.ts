import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Todo } from "./Todo";

@Entity()
export class StateTodo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("bool")
  isDefault!: boolean;

  @Column("text")
  value!: string;

  @OneToMany(() => Todo, todo => todo.state, { eager: true })
  todos!: Todo[];

  @Column("bool")
  isEnd!: boolean;

  @Column("bool")
  isStart!: boolean;
}
