import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RankingCommunityComponent } from './ranking-community.component';

const routes: Routes = [{ path: '', component: RankingCommunityComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RankingCommunityRoutingModule { }
