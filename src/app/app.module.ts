import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuardGuard } from './auth-guard.guard';
import { AdminGuardGuard } from './admin-guard.guard';
import { UserGuardGuard } from './user-guard.guard';
import { SettingsModule } from './user/settings/settings.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CloudinaryModule } from '@cloudinary/ng';



@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NoopAnimationsModule, SettingsModule, CloudinaryModule],
  providers: [AuthGuardGuard, AdminGuardGuard, UserGuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
