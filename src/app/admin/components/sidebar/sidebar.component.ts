import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

interface MenuItem {
  label: string;
  icon: string;
  routerLink: string;
  roles: string[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ RouterModule, MatListModule, MatIconModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.sass'
})
export class SidebarComponent {

  role: string | null = null

  constructor(
    private authService: AuthService,
  ) {}



  ngOnInit(): void {
    const user = this.authService.getUser()
    if (user) {
      this.role = user.role;
      console.log(this.role);
    }
  }

  menuItems: MenuItem[] = [
  {
    label: 'Dashboard',
    icon: 'dashboard',
    routerLink: '/admin/dashboard',
    roles: ['Admin', 'Content Editor']
  },
  {
    label: 'Post',
    icon: 'store',
    routerLink: '/admin/posts',
    roles: ['Admin', 'Content Editor']
  },
  {
    label: 'Teams',
    icon: 'store',
    routerLink: '/admin/teams',
    roles: ['Admin']
  },
  {
    label: 'Leagues',
    icon: 'store',
    routerLink: '/admin/leagues',
    roles: ['Admin']
  },
  {
    label: 'Contents',
    icon: 'store',
    routerLink: '/admin/contents',
    roles: ['Admin', 'Content Editor']
  },
  {
    label: 'Users',
    icon: 'group',
    routerLink: '/admin/users',
    roles: ['Admin']
  }
  ];

}
