import { Component, type OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { TODOS } from "../list-todo/mock-list-todo";
import { type TodoModel } from "../Todo";

@Component({
  selector: "app-detail-todo",
  templateUrl: "./detail-todo.component.html",
  styleUrls: ["./detail-todo.component.css"],
})
export class DetailTodoComponent implements OnInit {
  todoModelList: TodoModel[] = [];
  todoModel?: TodoModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.todoModelList = TODOS;
    const todoId = this.route.snapshot.paramMap.get("id");
    if (todoId) {
      this.todoModel = this.todoModelList.find(todo => todo.id === +todoId);
    }
  }

  async goToListTodo() {
    await this.router.navigate(["/todos"]);
  }
}
