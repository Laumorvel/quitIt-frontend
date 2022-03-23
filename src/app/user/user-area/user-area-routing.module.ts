import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClockComponent } from './clock/clock.component';
import { UserAreaComponent } from './user-area.component';

const routes: Routes = [{ path: '', component: UserAreaComponent },
{ path: 'clock', component: ClockComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAreaRoutingModule { }
