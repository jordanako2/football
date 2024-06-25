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

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: 'dashboard', component: DashboardComponent },
          { path: 'teams', component: TeamsComponent, canActivate: [AdminGuard] },
          { path: 'leagues', component: LeaguesComponent },
          { path: 'leagues/:id', component: LeagueDetailsComponent },
          { path: 'posts', component: PostsComponent },
          { path: 'users', component: UsersComponent },
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