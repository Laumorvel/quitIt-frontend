import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PenaltiesRoutingModule } from './penalties-routing.module';
import { PenaltiesComponent } from './penalties.component';


@NgModule({
  declarations: [
    PenaltiesComponent
  ],
  imports: [
    CommonModule,
    PenaltiesRoutingModule
  ]
})
export class PenaltiesModule { }
