import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAreaRoutingModule } from './user-area-routing.module';
import { UserAreaComponent } from './user-area.component';


@NgModule({
  declarations: [
    UserAreaComponent
  ],
  imports: [
    CommonModule,
    UserAreaRoutingModule
  ]
})
export class UserAreaModule { }
