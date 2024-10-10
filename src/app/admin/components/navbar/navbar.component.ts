import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';

interface MenuItem {
  label: string;
  icon: string;
  routerLink: string;
  roles: string[];
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ MatIconModule, MatButtonModule, MatToolbarModule, RouterModule, CommonModule, MatListModule ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.sass'
})
export class NavbarComponent {
  menuVisible = false; 
  toggleMenu() {
    this.menuVisible = !this.menuVisible; 
  }

  role: string | null = null
  isAuthenticated: boolean = false;
  user: any;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}



  ngOnInit(): void {
    const userData = this.authService.getUser()
    if (userData) {
      this.role = userData.role;
      this.user = userData
    }
  }

  logout(event: Event) {
    event.preventDefault();
    this.authService.logout();
  }

  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      routerLink: '/admin/dashboard',
      roles: ['Super Admin', 'Admin', 'Content Editor', 'Team']
    },
    // {
    //   label: 'Post',
    //   icon: 'store',
    //   routerLink: '/admin/posts',
    //   roles: ['Super Admin', 'Admin', 'Content Editor']
    // },
    {
      label: 'Teams',
      icon: 'flag',
      routerLink: '/admin/teams',
      roles: ['Super Admin', 'Admin', 'Team', 'Content Editor']
    },
    {
      label: 'Leagues',
      icon: 'golf_course',
      routerLink: '/admin/leagues',
      roles: ['Super Admin', 'Admin']
    },
    {
      label: 'Contents',
      icon: 'new_releases',
      routerLink: '/admin/contents',
      roles: ['Super Admin', 'Admin', 'Content Editor']
    },
    {
      label: 'Pages',
      icon: 'new_releases',
      routerLink: '/admin/pages',
      roles: ['Super Admin', 'Admin', 'Content Editor']
    },
    {
      label: 'Users',
      icon: 'group',
      routerLink: '/admin/users',
      roles: ['Super Admin', 'Admin']
    }
  ];
}
