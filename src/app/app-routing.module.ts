import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
    loadChildren: () =>
      import('./group-area/group-area.module').then((m) => m.GroupAreaModule),
  },
  {
    path: 'userArea',
    loadChildren: () =>
      import('./user/user-area/user-area.module').then((m) => m.UserAreaModule),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./user/settings/settings.module').then((m) => m.SettingsModule),
  },
  {
    path: 'friends',
    loadChildren: () =>
      import('./user/friends/friends.module').then((m) => m.FriendsModule),
  },
  {
    path: 'meetUps',
    loadChildren: () =>
      import('./user/meet-ups/meet-ups.module').then((m) => m.MeetUpsModule),
  },
  {
    path: 'achievements',
    loadChildren: () =>
      import('./user/achievements/achievements.module').then(
        (m) => m.AchievementsModule
      ),
  },
  {
    path: 'penalties',
    loadChildren: () =>
      import('./user/penalties/penalties.module').then(
        (m) => m.PenaltiesModule
      ),
  },
  {
    path: 'rankingCommunity',
    loadChildren: () =>
      import('./user/ranking-community/ranking-community.module').then(
        (m) => m.RankingCommunityModule
      ),
  },
  {
    path: 'commentsCommunity',
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
