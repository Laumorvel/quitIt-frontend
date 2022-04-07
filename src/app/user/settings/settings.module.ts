import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { GeneralDataComponent } from './general-data/general-data.component';
import { ExsmokerDataComponent } from './exsmoker-data/exsmoker-data.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { ShowImageComponent } from './show-image/show-image.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    SettingsComponent,
    GeneralDataComponent,
    ExsmokerDataComponent,
    ChangePassComponent,
    ShowImageComponent,
  ],
  imports: [CommonModule, SettingsRoutingModule, FormsModule],
  exports: [],
})
export class SettingsModule {}
