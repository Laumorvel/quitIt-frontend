import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FloatingButtonRoutingModule } from './floating-button-routing.module';
import { FloatingButtonComponent } from './floating-button.component';


@NgModule({
  declarations: [
    FloatingButtonComponent
  ],
  imports: [
    CommonModule,
    FloatingButtonRoutingModule
  ],
  exports: [ FloatingButtonComponent]
})
export class FloatingButtonModule { }
