import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FloatingButtonComponent } from './floating-button.component';

const routes: Routes = [{ path: '', component: FloatingButtonComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FloatingButtonRoutingModule { }
