import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendsRoutingModule } from './friends-routing.module';
import { FriendsComponent } from './friends.component';
import { AddFriendsComponent } from './add-friends/add-friends.component';
import { ShowFriendsComponent } from './show-friends/show-friends.component';


@NgModule({
  declarations: [
    FriendsComponent,
    AddFriendsComponent,
    ShowFriendsComponent
  ],
  imports: [
    CommonModule,
    FriendsRoutingModule
  ]
})
export class FriendsModule { }
