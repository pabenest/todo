import { NgModule } from "@angular/core";
import { RouterModule, type Routes } from "@angular/router";

const routes: Routes = [{ path: "", redirectTo: "todos", pathMatch: "full" }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
