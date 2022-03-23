import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentsCommunityRoutingModule } from './comments-community-routing.module';
import { CommentsCommunityComponent } from './comments-community.component';
import { IncidenceComponent } from './incidence/incidence.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CommentsCommunityComponent,
    IncidenceComponent
  ],
  imports: [
    CommonModule,
    CommentsCommunityRoutingModule,
    FormsModule
  ]
})
export class CommentsCommunityModule { }
