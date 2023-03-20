import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { MainComponent } from "./main.component"

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'sorting',
        loadChildren: () => import('../sorting/sorting.module').then((m) => m.SortingModule)
      },
      {
        path: '',
        redirectTo: 'sorting',
        pathMatch: 'full'
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class MainRoutingModule {}
