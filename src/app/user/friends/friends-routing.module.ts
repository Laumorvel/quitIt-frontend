import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FriendsComponent } from './friends.component';
import { AddFriendsComponent } from './add-friends/add-friends.component';
import { ShowFriendsComponent } from './show-friends/show-friends.component';

const routes: Routes = [
  { path: '', component: FriendsComponent },
  { path: 'addFriends', component: AddFriendsComponent },
  { path: 'showFriends', component: ShowFriendsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FriendsRoutingModule { }
