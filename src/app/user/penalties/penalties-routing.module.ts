import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PenaltiesComponent } from './penalties.component';

const routes: Routes = [{ path: '', component: PenaltiesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PenaltiesRoutingModule { }
