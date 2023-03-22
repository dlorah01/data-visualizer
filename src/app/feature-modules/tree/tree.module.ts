import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TreeRoutingModule } from './tree-routing.module';
import { TreeComponent } from './tree.component';
import { TreeControlsComponent } from './tree-controls/tree-controls.component';


@NgModule({
  declarations: [
    TreeComponent,
    TreeControlsComponent
  ],
  imports: [
    CommonModule,
    TreeRoutingModule
  ]
})
export class TreeModule { }
