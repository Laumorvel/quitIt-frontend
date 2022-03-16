import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministratorDashboardRoutingModule } from './administrator-dashboard-routing.module';
import { AdministratorDashboardComponent } from './administrator-dashboard.component';
import { IncidencesComponent } from './incidences/incidences.component';
import { ShowUsersComponent } from './show-users/show-users.component';


@NgModule({
  declarations: [
    AdministratorDashboardComponent,
    IncidencesComponent,
    ShowUsersComponent
  ],
  imports: [
    CommonModule,
    AdministratorDashboardRoutingModule
  ]
})
export class AdministratorDashboardModule { }
