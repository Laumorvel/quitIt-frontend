import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RankingCommunityRoutingModule } from './ranking-community-routing.module';
import { RankingCommunityComponent } from './ranking-community.component';


@NgModule({
  declarations: [
    RankingCommunityComponent
  ],
  imports: [
    CommonModule,
    RankingCommunityRoutingModule
  ]
})
export class RankingCommunityModule { }
