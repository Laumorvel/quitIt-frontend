import { Component, NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePassComponent } from 'src/app/user/settings/change-pass/change-pass.component';
import { ExsmokerDataComponent } from 'src/app/user/settings/exsmoker-data/exsmoker-data.component';
import { GeneralDataComponent } from 'src/app/user/settings/general-data/general-data.component';
import { SettingsComponent } from 'src/app/user/settings/settings.component';

const routes: Routes = [
  { path: '', component: SettingsComponent },
  { path: 'changePass', component: ChangePassComponent, outlet: 'settings' },
  {
    path: 'exSmokerData',
    component: ExsmokerDataComponent,
    outlet: 'settings',
  },
  { path: 'generalData', component: GeneralDataComponent, outlet: 'settings' },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuAuxComponent {}
