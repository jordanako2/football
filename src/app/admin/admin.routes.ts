import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { NewsComponent } from './pages/news/news.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { PostsComponent } from './pages/posts/posts.component';
import { UsersComponent } from './pages/users/users.component';
import { LeaguesComponent } from './pages/leagues/leagues.component';
import { LeagueDetailsComponent } from './pages/leagues/league-details/league-details.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: 'dashboard', component: DashboardComponent },
          { path: 'news', component: NewsComponent },
          { path: 'teams', component: TeamsComponent },
          { path: 'leagues', component: LeaguesComponent },
          { path: 'leagues/:id', component: LeagueDetailsComponent },
          { path: 'posts', component: PostsComponent },
          { path: 'users', component: UsersComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AdminRoutingModule { }