import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { QuizComponent } from './quiz/quiz.component';


@NgModule({
  declarations: [
    RegisterComponent,
    QuizComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    RegisterComponent
  ]
})
export class RegisterModule { }
