import { Component, type ElementRef, type OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { type StateTodoModel, type TodoModel } from "../Todo";
import { TodoService } from "../todo.service";

@Component({
  selector: "app-list-todo",
  templateUrl: "./list-todo.component.html",
  styleUrls: ["./list-todo.component.css"],
})
export class ListTodoComponent implements OnInit {
  newValue = "";
  todoList: TodoModel[] = [];
  stateTodoList: StateTodoModel[] = [];
  filteredTodoList: TodoModel[] = [];
  loading = false;
  currentEditedTodo: TodoModel | null = null;

  @ViewChild("inputTodo") private inputTodoElement: ElementRef<HTMLInputElement> | null = null;
  @ViewChild("selectState") private selectStateElement: ElementRef<HTMLSelectElement> | null = null;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private todoService: TodoService,
  ) {}

  async ngOnInit() {
    this.stateTodoList = await this.todoService.getStateTodoList();
    this.route.fragment.subscribe(fragment => {
      this.loading = true;
      void this.loadTodoList(fragment).then(() => {
        this.loading = false;
      });
    });
  }

  focusEditInput() {
    setTimeout(() => {
      this.inputTodoElement?.nativeElement.focus();
    }, 0);
  }

  async onFocusOut($event: FocusEvent) {
    if (
      ($event.target === this.inputTodoElement?.nativeElement &&
        $event.relatedTarget === this.selectStateElement?.nativeElement) ||
      ($event.target === this.selectStateElement?.nativeElement &&
        $event.relatedTarget === this.inputTodoElement?.nativeElement)
    ) {
      return;
    }

    console.log("onFocusOut", $event, this.inputTodoElement, this.selectStateElement);

    let updated = false;
    const updatedTodo = this.currentEditedTodo ? { ...this.currentEditedTodo } : null;
    this.currentEditedTodo = null;
    if (updatedTodo) {
      await this.todoService.updateTodo(updatedTodo);
      updated = true;
    }
    if (updated) {
      await this.loadTodoList(this.route.snapshot.fragment);
    }
  }

  private async loadTodoList(fragment: string | null) {
    console.log("fragment", fragment);
    this.todoList = await this.todoService.getTodoList();
    switch (fragment) {
      case "/active":
        this.filteredTodoList = this.todoList.filter(x => this.getStateTodo(x.state).isStart);
        break;
      case "/completed":
        this.filteredTodoList = this.todoList.filter(x => this.getStateTodo(x.state).isEnd);
        break;
      case "/indeterminate":
        this.filteredTodoList = this.todoList.filter(
          x => !this.getStateTodo(x.state).isEnd && !this.getStateTodo(x.state).isStart,
        );
        break;
      default:
        console.log("no fragment", this.todoList);
        this.filteredTodoList = this.todoList;
        break;
    }
  }

  public async changeTodoState(todo: TodoModel, stateId: number) {
    todo.state = stateId;
    await this.todoService.updateTodo(todo);
    await this.loadTodoList(this.route.snapshot.fragment);
  }

  public getSourceTodo(id: number) {
    const todo = this.todoList.find(x => x.id === id);
    if (!todo) {
      throw new Error(`Todo with given id "${id}" not found`);
    }
    return todo;
  }

  async addTodo() {
    const newTodo = {
      id: this.findLastId() + 1,
      state: this.getStartStateTodo().id,
      value: this.newValue.trim(),
    };
    this.newValue = "";
    const fragment = this.route.snapshot.fragment;
    if (fragment === "/" || fragment === "/active" || !fragment) {
      this.filteredTodoList.push(newTodo);
    }
    await this.todoService.addTodo(newTodo);
    await this.loadTodoList(fragment);
  }

  async removeTodo(todoView: TodoModel) {
    this.filteredTodoList = this.filteredTodoList.filter(x => x.id !== todoView.id);
    await this.todoService.deleteTodoById(todoView.id);
    await this.loadTodoList(this.route.snapshot.fragment);
  }

  getNotCompleted() {
    return this.filteredTodoList.filter(x => !this.getStateTodo(x.state).isEnd);
  }

  getStateTodo(id: number) {
    const stateTodo = this.stateTodoList.find(state => state.id === id);
    if (!stateTodo) {
      throw new Error(`State with given id "${id}" not found`);
    }
    return stateTodo;
  }

  getEndStateTodo() {
    const stateTodo = this.stateTodoList.find(state => state.isEnd);
    if (!stateTodo) {
      throw new Error(`End state not found`);
    }
    return stateTodo;
  }

  getStartStateTodo() {
    const stateTodo = this.stateTodoList.find(state => state.isStart);
    if (!stateTodo) {
      throw new Error(`Start state not found`);
    }
    return stateTodo;
  }

  getTodoLeftLabel() {
    const left = this.getNotCompleted().length;
    if (left > 1) {
      return left + "items left";
    }
    return left + "item left";
  }

  private findLastId(): number {
    const ids = this.todoList.map(x => x.id);
    return Math.max(...ids);
  }
}
