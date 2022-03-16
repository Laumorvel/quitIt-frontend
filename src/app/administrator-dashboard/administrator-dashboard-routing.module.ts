import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministratorDashboardComponent } from './administrator-dashboard.component';
import { IncidencesComponent } from './incidences/incidences.component';
import { ShowUsersComponent } from './show-users/show-users.component';

const routes: Routes = [
  { path: '', component: AdministratorDashboardComponent },
  {path: 'incidences', component:IncidencesComponent},
  {path: 'showUsers', component:ShowUsersComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministratorDashboardRoutingModule {}
