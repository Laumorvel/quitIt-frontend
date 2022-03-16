import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupAreaRoutingModule } from './group-area-routing.module';
import { GroupAreaComponent } from './group-area.component';
import { RankingGroupComponent } from './ranking-group/ranking-group.component';
import { AddUserGroupComponent } from './add-user-group/add-user-group.component';
import { CommentsGroupComponent } from './comments-group/comments-group.component';


@NgModule({
  declarations: [
    GroupAreaComponent,
    RankingGroupComponent,
    AddUserGroupComponent,
    CommentsGroupComponent
  ],
  imports: [
    CommonModule,
    GroupAreaRoutingModule
  ]
})
export class GroupAreaModule { }
