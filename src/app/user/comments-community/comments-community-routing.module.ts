import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentsCommunityComponent } from './comments-community.component';

const routes: Routes = [{ path: '', component: CommentsCommunityComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentsCommunityRoutingModule { }
