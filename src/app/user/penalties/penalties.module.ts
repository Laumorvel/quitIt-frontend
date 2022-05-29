import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PenaltiesRoutingModule } from './penalties-routing.module';
import { PenaltiesComponent } from './penalties.component';
import { FloatingButtonModule } from 'src/app/shared/floating-button/floating-button.module';


@NgModule({
  declarations: [
    PenaltiesComponent
  ],
  imports: [
    CommonModule,
    PenaltiesRoutingModule,
    FloatingButtonModule
  ]
})
export class PenaltiesModule { }
