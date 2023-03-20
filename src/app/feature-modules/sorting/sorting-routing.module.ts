import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { SortingComponent } from "./sorting.component"

const routes: Routes = [
  {
    path: '',
    component: SortingComponent,
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class SortingRoutingModule {}
