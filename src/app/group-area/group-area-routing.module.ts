import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupAreaComponent } from './group-area.component';
import { AddUserGroupComponent } from './add-user-group/add-user-group.component';
import { CommentsGroupComponent } from './comments-group/comments-group.component';
import { RankingGroupComponent } from './ranking-group/ranking-group.component';
import { GroupComponent } from './group/group.component';

const routes: Routes = [{ path: '', component: GroupAreaComponent },
{path: 'group/:id', component: GroupComponent},
{ path: 'addUserGroup', component: AddUserGroupComponent },
{ path: 'commentsGroup', component: CommentsGroupComponent },
{ path: 'rankingGroup', component: RankingGroupComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupAreaRoutingModule {}
