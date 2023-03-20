import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortingComponent } from './sorting.component';
import { SortingRoutingModule } from './sorting-routing.module';
import { SortingControlsComponent } from './sorting-controls/sorting-controls.component';



@NgModule({
  declarations: [
    SortingComponent,
    SortingControlsComponent
  ],
  imports: [
    CommonModule,
    SortingRoutingModule
  ]
})
export class SortingModule { }
