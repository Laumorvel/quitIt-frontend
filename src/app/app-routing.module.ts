import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './auth-guard.guard';

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
    canActivate: [AuthGuardGuard],
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
    canActivate: [AuthGuardGuard],
    loadChildren: () =>
      import('./group-area/group-area.module').then((m) => m.GroupAreaModule),
  },
  {
    path: 'userArea',
    canActivate: [AuthGuardGuard],
    loadChildren: () =>
      import('./user/user-area/user-area.module').then((m) => m.UserAreaModule),
  },
  {
    path: 'settings',
    canActivate: [AuthGuardGuard],
    loadChildren: () =>
      import('./user/settings/settings.module').then((m) => m.SettingsModule),
  },
  {
    path: 'friends',
    canActivate: [AuthGuardGuard],
    loadChildren: () =>
      import('./user/friends/friends.module').then((m) => m.FriendsModule),
  },
  {
    path: 'meetUps',
    canActivate: [AuthGuardGuard],
    loadChildren: () =>
      import('./user/meet-ups/meet-ups.module').then((m) => m.MeetUpsModule),
  },
  {
    path: 'achievements',
    canActivate: [AuthGuardGuard],
    loadChildren: () =>
      import('./user/achievements/achievements.module').then(
        (m) => m.AchievementsModule
      ),
  },
  {
    path: 'penalties',
    canActivate: [AuthGuardGuard],
    loadChildren: () =>
      import('./user/penalties/penalties.module').then(
        (m) => m.PenaltiesModule
      ),
  },
  {
    path: 'rankingCommunity',
    canActivate: [AuthGuardGuard],
    loadChildren: () =>
      import('./user/ranking-community/ranking-community.module').then(
        (m) => m.RankingCommunityModule
      ),
  },
  {
    path: 'commentsCommunity',
    canActivate: [AuthGuardGuard],
    loadChildren: () =>
      import('./user/comments-community/comments-community.module').then(
        (m) => m.CommentsCommunityModule
      ),
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
