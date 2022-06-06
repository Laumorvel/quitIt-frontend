import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministratorDashboardRoutingModule } from './administrator-dashboard-routing.module';
import { AdministratorDashboardComponent } from './administrator-dashboard.component';
import { IncidencesComponent } from './incidences/incidences.component';
import { ShowUsersComponent } from './show-users/show-users.component';
import { FormsModule } from '@angular/forms';
import {TableModule} from 'primeng/table';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {DialogModule} from 'primeng/dialog';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {InputTextModule} from 'primeng/inputtext';
import {ProgressBarModule} from 'primeng/progressbar';
import {DropdownModule} from 'primeng/dropdown';


@NgModule({
  declarations: [
    AdministratorDashboardComponent,
    IncidencesComponent,
    ShowUsersComponent
  ],
  imports: [
    CommonModule,
    AdministratorDashboardRoutingModule,
    FormsModule,
    TableModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    ProgressBarModule,
    DropdownModule
  ],
  exports:[
  ]
})
export class AdministratorDashboardModule { }
