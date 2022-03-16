import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetUpsComponent } from './meet-ups.component';

const routes: Routes = [{ path: '', component: MeetUpsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeetUpsRoutingModule { }
