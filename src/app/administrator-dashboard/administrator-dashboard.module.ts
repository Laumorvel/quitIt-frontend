import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministratorDashboardRoutingModule } from './administrator-dashboard-routing.module';
import { AdministratorDashboardComponent } from './administrator-dashboard.component';
import { IncidencesComponent } from './incidences/incidences.component';
import { ShowUsersComponent } from './show-users/show-users.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdministratorDashboardComponent,
    IncidencesComponent,
    ShowUsersComponent
  ],
  imports: [
    CommonModule,
    AdministratorDashboardRoutingModule,
    FormsModule
  ],
  exports:[
  ]
})
export class AdministratorDashboardModule { }
