import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AchievementsRoutingModule } from './achievements-routing.module';
import { AchievementsComponent } from './achievements.component';
import { FloatingButtonModule } from 'src/app/shared/floating-button/floating-button.module';

@NgModule({
  declarations: [
    AchievementsComponent
  ],
  imports: [
    CommonModule,
    AchievementsRoutingModule,
    FloatingButtonModule
  ]
})
export class AchievementsModule { }
