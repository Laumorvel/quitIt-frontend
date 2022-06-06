import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeetUpsRoutingModule } from './meet-ups-routing.module';
import { MeetUpsComponent } from './meet-ups.component';
import { ShowMeetUpsComponent } from './show-meet-ups/show-meet-ups.component';
import { CreateMeetUpsComponent } from './create-meet-ups/create-meet-ups.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';

@NgModule({
  declarations: [
    MeetUpsComponent,
    ShowMeetUpsComponent,
    CreateMeetUpsComponent
  ],
  imports: [
    CommonModule,
    MeetUpsRoutingModule,
    DataTablesModule,
    FormsModule,
    TabViewModule,
    ButtonModule,
    TableModule,
    CalendarModule,
		SliderModule,
		DialogModule,
		MultiSelectModule,
		ContextMenuModule,
		DropdownModule,
		ToastModule,
    InputTextModule,
    ProgressBarModule
  ]
})
export class MeetUpsModule { }
