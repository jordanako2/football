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
import { AddContentComponent } from './pages/news/add-content/add-content.component';
import { AdminGuard } from '../guards/admin.guard';
import { AuthGuard } from '../guards/auth.guard';
import { TeamDetailsComponent } from './pages/teams/team-details/team-details.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        canActivate: [AuthGuard],
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: 'dashboard', component: DashboardComponent },
          { path: 'teams', component: TeamsComponent },
          { path: 'teams/:id', component: TeamDetailsComponent },
          { path: 'leagues', component: LeaguesComponent, canActivate: [AdminGuard] },
          { path: 'leagues/:id', component: LeagueDetailsComponent, canActivate: [AdminGuard] },
          { path: 'posts', component: PostsComponent, canActivate: [AdminGuard] },
          { path: 'users', component: UsersComponent, canActivate: [AdminGuard] },
          { path: 'contents', component: NewsComponent },
          { path: 'content/create', component: AddContentComponent },
          { path: 'content/edit/:id', component: AddContentComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AdminRoutingModule { }