import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAreaRoutingModule } from './user-area-routing.module';
import { UserAreaComponent } from './user-area.component';
import { ClockComponent } from './clock/clock.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    UserAreaComponent,
    ClockComponent
  ],
  imports: [
    CommonModule,
    UserAreaRoutingModule,
    HttpClientModule
  ]
})
export class UserAreaModule { }
