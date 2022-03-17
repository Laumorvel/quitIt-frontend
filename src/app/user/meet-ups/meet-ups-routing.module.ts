import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetUpsComponent } from './meet-ups.component';
import { CreateMeetUpsComponent } from './create-meet-ups/create-meet-ups.component';
import { ShowMeetUpsComponent } from './show-meet-ups/show-meet-ups.component';

const routes: Routes = [
  { path: '', component: MeetUpsComponent },
  { path: 'createMeetUps', component: CreateMeetUpsComponent },
  { path: 'showMeetUps', component: ShowMeetUpsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeetUpsRoutingModule { }
