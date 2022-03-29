import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuardGuard } from './admin-guard.guard';
import { AuthGuardGuard } from './auth-guard.guard';
import { UserGuardGuard } from './user-guard.guard';
import { SettingsComponent } from './user/settings/settings.component';
import { GeneralDataComponent } from './user/settings/general-data/general-data.component';
import { ExsmokerDataComponent } from './user/settings/exsmoker-data/exsmoker-data.component';
import { ChangePassComponent } from './user/settings/change-pass/change-pass.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./auth/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./auth/register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: 'administratorDashboard',
    canActivate: [AuthGuardGuard, AdminGuardGuard],
    loadChildren: () =>
      import('./administrator-dashboard/administrator-dashboard.module').then(
        (m) => m.AdministratorDashboardModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./public/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'contactUs',
    loadChildren: () =>
      import('./public/contact-us/contact-us.module').then(
        (m) => m.ContactUsModule
      ),
  },
  {
    path: 'groupArea',
    canActivate: [AuthGuardGuard, UserGuardGuard],
    loadChildren: () =>
      import('./group-area/group-area.module').then((m) => m.GroupAreaModule),
  },
  {
    path: 'userArea',
    canActivate: [AuthGuardGuard, UserGuardGuard],
    loadChildren: () =>
      import('./user/user-area/user-area.module').then((m) => m.UserAreaModule),
  },
  {
    path: 'settings',
    //  canDeactivate: [CloseAuxRoutingGuard],
    canActivate: [AuthGuardGuard, UserGuardGuard],
    component: SettingsComponent,
    children:[
      {
        path: 'generalData',
        component: GeneralDataComponent,
        outlet: 'setting'
      },
      {
        path: 'exSmokerData',
        component: ExsmokerDataComponent,
        outlet: 'setting'
      },
      {
        path: 'changePass',
        component: ChangePassComponent,
        outlet: 'setting'
      }
    ]
  },
  {
    path: 'friends',
    canActivate: [AuthGuardGuard, UserGuardGuard],
    loadChildren: () =>
      import('./user/friends/friends.module').then((m) => m.FriendsModule),
  },
  {
    path: 'meetUps',
    canActivate: [AuthGuardGuard, UserGuardGuard],
    loadChildren: () =>
      import('./user/meet-ups/meet-ups.module').then((m) => m.MeetUpsModule),
  },
  {
    path: 'achievements',
    canActivate: [AuthGuardGuard, UserGuardGuard],
    loadChildren: () =>
      import('./user/achievements/achievements.module').then(
        (m) => m.AchievementsModule
      ),
  },
  {
    path: 'penalties',
    canActivate: [AuthGuardGuard, UserGuardGuard],
    loadChildren: () =>
      import('./user/penalties/penalties.module').then(
        (m) => m.PenaltiesModule
      ),
  },
  {
    path: 'rankingCommunity',
    canActivate: [AuthGuardGuard, UserGuardGuard],
    loadChildren: () =>
      import('./user/ranking-community/ranking-community.module').then(
        (m) => m.RankingCommunityModule
      ),
  },
  {
    path: 'commentsCommunity',
    canActivate: [AuthGuardGuard, UserGuardGuard],
    loadChildren: () =>
      import('./user/comments-community/comments-community.module').then(
        (m) => m.CommentsCommunityModule
      ),
  },
  {
    path: 'commentsCommunity/:id',
    canActivate: [AuthGuardGuard, UserGuardGuard],
    loadChildren: () =>
      import('./user/comments-community/comments-community.module').then(
        (m) => m.CommentsCommunityModule
      ),
  },
  { path: 'floatingButton', loadChildren: () => import('./shared/floating-button/floating-button.module').then(m => m.FloatingButtonModule) },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
