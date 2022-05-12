import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeetUpsRoutingModule } from './meet-ups-routing.module';
import { MeetUpsComponent } from './meet-ups.component';
import { ShowMeetUpsComponent } from './show-meet-ups/show-meet-ups.component';
import { CreateMeetUpsComponent } from './create-meet-ups/create-meet-ups.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';


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
    FormsModule
  ]
})
export class MeetUpsModule { }
