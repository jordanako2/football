import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { routes } from '../../client.route';
import { environment } from '../../../environments/environment';
import { PageService } from '../../../services/page.service';
import { TeamService } from '../../../services/team.service';

interface Page {
  slug: string;
}

interface Team {
  slug: string;
}

@Component({
  selector: 'app-links',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.sass']
})
export class LinksComponent implements OnInit {
  allLinks: string[] = [];
  clientUrl: string = environment.clientUrl;

  constructor(
    private router: Router, 
    private pageService: PageService,
    private teamService: TeamService
  ) {}

  ngOnInit() {
    this.getRoutes(routes);
    this.getPages();
    this.getTeams();
  }

  getRoutes(routes: Routes, parentPath: string = '') {
    for (const route of routes) {
      const path = parentPath + (route.path ? `${route.path}` : '');
      if (route.path && path !== '' && !/:.*$/.test(path)) {
        this.allLinks.push(this.clientUrl + path);
      }
      if (route.children) {
        this.getRoutes(route.children, path);
      }
    }
  }

  getPages() {
    this.pageService.getPages().subscribe({
      next: (res: Page[]) => {
        this.allLinks.push(...res.map(page => this.clientUrl + page.slug));
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getTeams() {
    this.teamService.getTeams().subscribe({
      next: (res: Team[]) => {
        this.allLinks.push(...res.map(team => this.clientUrl + 'clubs/' + team.slug));
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
