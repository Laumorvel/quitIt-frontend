import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentsCommunityComponent } from './comments-community.component';
import { IncidenceComponent } from './incidence/incidence.component';

const routes: Routes = [
  { path: '', component: CommentsCommunityComponent },
  { path: 'incidence', component: IncidenceComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentsCommunityRoutingModule { }
