import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

interface MenuItem {
  label: string;
  icon: string;
  routerLink: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ RouterModule, MatListModule, MatIconModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.sass'
})
export class SidebarComponent {

    menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      routerLink: '/admin/dashboard'
    },
    {
      label: 'Post',
      icon: 'store',
      routerLink: '/admin/posts'
    },
    {
      label: 'Teams',
      icon: 'store',
      routerLink: '/admin/teams'
    },
    {
      label: 'Leagues',
      icon: 'store',
      routerLink: '/admin/leagues'
    },
    {
      label: 'News',
      icon: 'store',
      routerLink: '/admin/news'
    },
    {
      label: 'Users',
      icon: 'group',
      routerLink: '/admin/users'
    }
  ];

}
