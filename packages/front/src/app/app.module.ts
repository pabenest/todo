import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { TodoModule } from "./todo/todo.module";

@NgModule({
  declarations: [AppComponent],
  imports: [CommonModule, FormsModule, HttpClientModule, BrowserModule, AppRoutingModule, TodoModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
