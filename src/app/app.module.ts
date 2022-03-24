import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuardGuard } from './auth-guard.guard';
import { AdminGuardGuard } from './admin-guard.guard';
import { UserGuardGuard } from './user-guard.guard';
import { SettingsModule } from './user/settings/settings.module';
import { CloseAuxRoutingGuard } from './close-aux-routing.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, SettingsModule],
  providers: [AuthGuardGuard, AdminGuardGuard, UserGuardGuard, CloseAuxRoutingGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
