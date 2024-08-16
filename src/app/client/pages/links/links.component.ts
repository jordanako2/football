import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { routes } from '../../client.route';


@Component({
  selector: 'app-links',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './links.component.html',
  styleUrl: './links.component.sass'
})
export class LinksComponent {
  routes: string[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.getRoutes(routes);
  }

  getRoutes(routes: Routes, parentPath: string = '') {
    console.log(routes)
    for (const route of routes) {
      const path = parentPath + (route.path ? `/${route.path}` : '');
      if (route.path && path !== '') {
        this.routes.push(this.formatPath(path));
      }
      if (route.children) {
        this.getRoutes(route.children, path);
      }
    }
  }

  formatPath(path: string): string {
    return path.replace(/\/:\w+/g, '/<param>');  // Replace parameterized segments with '<param>'
  }
}
