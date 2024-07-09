import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { GoogleService } from '../../../../services/google.service';
import { MatCardModule } from '@angular/material/card';
import { MatListItemIcon, MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-middle-header',
  standalone: true,
  imports: [
    CommonModule, 
    MatButtonModule, 
    RouterLink, 
    MatListModule, 
    MatCardModule, 
    MatIconModule, 
    MatListItemIcon, 
    MatMenuModule, 
    MatMenuTrigger, 
    MatButtonModule,
  ],
  templateUrl: './middle-header.component.html',
  styleUrl: './middle-header.component.sass'
})
export class MiddleHeaderComponent {

  showDropdown = false;
  isSubmenuOpen: { [key: string]: boolean } = {
    leagues: false,
    footballcommunity: false,
    about: false
  };
  isDashboardSelected = false;

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }


  constructor(
    private authService: AuthService,
    private googleService: GoogleService
  ) {}

  toggleSubmenu(menuName: string) {
    // Toggle the submenu for the clicked menuName
    this.isSubmenuOpen[menuName] = !this.isSubmenuOpen[menuName];
  }


  selectDashboard() {
    this.isDashboardSelected = true;
  }

  // isMenuOpen: boolean[] = [false, false, false, false]; 
  isAuthenticated: boolean = false;
  user: any;

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.user = user;
      this.showDropdown = false;
    });
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
      this.showDropdown = false;
    });
    this.googleService.user$.subscribe(user => {
      this.user = user;
      this.showDropdown = false;
    });
    this.googleService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
      this.showDropdown = false;
    });
    this.user = this.authService.getUser();
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  // toggleMenu(index: number) {
  //   this.isMenuOpen[index] = true;
  // }

  logout(event: Event) {
    event.preventDefault();
    this.authService.logout();
  }
}
  




