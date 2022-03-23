import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { ExsmokerDataComponent } from './exsmoker-data/exsmoker-data.component';
import { GeneralDataComponent } from './general-data/general-data.component';

const routes: Routes = [
  { path: '', component: SettingsComponent },
  { path: 'changePass', component: ChangePassComponent, outlet: 'settings' },
  { path: 'exSmokerData', component: ExsmokerDataComponent , outlet: 'settings'},
  { path: 'generalData', component: GeneralDataComponent , outlet: 'settings'}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
