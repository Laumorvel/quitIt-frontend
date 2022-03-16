import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentsCommunityRoutingModule } from './comments-community-routing.module';
import { CommentsCommunityComponent } from './comments-community.component';
import { IncidenceComponent } from './incidence/incidence.component';


@NgModule({
  declarations: [
    CommentsCommunityComponent,
    IncidenceComponent
  ],
  imports: [
    CommonModule,
    CommentsCommunityRoutingModule
  ]
})
export class CommentsCommunityModule { }
