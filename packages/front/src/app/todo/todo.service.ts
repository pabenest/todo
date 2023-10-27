import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom, of, tap } from "rxjs";

import { type StateTodoModel, type TodoModel } from "./Todo";

const defaultHttpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable()
export class TodoService {
  baseUrl = "http://localhost:3000";

  private urlTodo = new URL("todo/", this.baseUrl);
  private urlStateTodo = new URL("state-todo/", this.baseUrl);

  constructor(private http: HttpClient) {}

  getTodoList(): Promise<TodoModel[]> {
    return firstValueFrom(
      this.http.get<TodoModel[]>(this.urlTodo.toString()).pipe(tap(value => console.log("getTodoList()", value))),
    );
  }

  async addTodo(todo: TodoModel): Promise<void> {
    await firstValueFrom(
      this.http
        .post(this.urlTodo.toString(), todo, defaultHttpOptions)
        .pipe(tap(value => console.log("addTodo()", value))),
    );
  }

  async updateTodo(todo: TodoModel): Promise<void> {
    await firstValueFrom(
      this.http
        .put(new URL(`${todo.id}`, this.urlTodo).toString(), todo, defaultHttpOptions)
        .pipe(tap(value => console.log("updateTodo()", value))),
    );
  }

  async deleteTodoById(id: number): Promise<void> {
    await firstValueFrom(
      this.http
        .delete(new URL(`${id}`, this.urlTodo).toString())
        .pipe(tap(value => console.log("deleteTodoById()", value))),
    );
  }

  getStateTodoList(): Promise<StateTodoModel[]> {
    return firstValueFrom(
      this.http
        .get<StateTodoModel[]>(this.urlStateTodo.toString())
        .pipe(tap(value => console.log("getStateTodoList()", value))),
    );
  }

  private handleError(error: unknown, errorValue: unknown) {
    console.error(error);
    return of(errorValue);
  }
}
