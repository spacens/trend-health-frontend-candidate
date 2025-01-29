import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const PAGE_PATH = {search_page: "details", search_details: "details"}

const routes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./search/search.component").then((c) => c.SearchComponent),
  },
  {
    path: "details/:id",
    loadComponent: () =>
      import("./details/details.component").then((c) => c.DetailsComponent),
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
