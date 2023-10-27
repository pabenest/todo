import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, type Routes } from "@angular/router";

import { DetailTodoComponent } from "./detail-todo/detail-todo.component";
import { ListTodoComponent } from "./list-todo/list-todo.component";
import { TodoService } from "./todo.service";

const todoRoutes: Routes = [
  { path: "todos", component: ListTodoComponent },
  { path: "todo/:id", component: DetailTodoComponent },
];

@NgModule({
  declarations: [ListTodoComponent, DetailTodoComponent],
  imports: [CommonModule, FormsModule, RouterModule.forChild(todoRoutes)],
  providers: [TodoService],
})
export class TodoModule {}
