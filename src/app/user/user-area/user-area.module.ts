import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAreaRoutingModule } from './user-area-routing.module';
import { UserAreaComponent } from './user-area.component';
import { ClockComponent } from './clock/clock.component';
import { HttpClientModule } from '@angular/common/http';
import { FloatingButtonModule } from '../../shared/floating-button/floating-button.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UserAreaComponent,
    ClockComponent
  ],
  imports: [
    CommonModule,
    UserAreaRoutingModule,
    HttpClientModule,
    FloatingButtonModule,
    FormsModule
  ]
})
export class UserAreaModule { }
