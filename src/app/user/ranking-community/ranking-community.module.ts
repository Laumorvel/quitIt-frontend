import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RankingCommunityRoutingModule } from './ranking-community-routing.module';
import { RankingCommunityComponent } from './ranking-community.component';

import { DataTablesModule } from "angular-datatables";




@NgModule({
  declarations: [
    RankingCommunityComponent
  ],
  imports: [
    CommonModule,
    RankingCommunityRoutingModule,
    DataTablesModule
  ]
})
export class RankingCommunityModule { }
