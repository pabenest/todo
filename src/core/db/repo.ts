import { AppDataSource } from "./datasource";
import { StateTodo } from "./entity/StateTodo";
import { Todo } from "./entity/Todo";

export const todoRepository = AppDataSource.getRepository(Todo);
export const stateTodoRepository = AppDataSource.getRepository(StateTodo);
