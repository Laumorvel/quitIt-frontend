import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { GeneralDataComponent } from './general-data/general-data.component';
import { ExsmokerDataComponent } from './exsmoker-data/exsmoker-data.component';
import { ChangePassComponent } from './change-pass/change-pass.component';


@NgModule({
  declarations: [
    SettingsComponent,
    GeneralDataComponent,
    ExsmokerDataComponent,
    ChangePassComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule
  ],
  exports:[
    SettingsComponent]
})
export class SettingsModule { }
