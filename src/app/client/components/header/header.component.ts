import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { TopHeaderComponent } from './top-header/top-header.component';
import { MiddleHeaderComponent } from './middle-header/middle-header.component';
import { BottomHeaderComponent } from './bottom-header/bottom-header.component';
import { AuthService } from '../../../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatListItem, MatSelectionList } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { GoogleService } from '../../../services/google.service';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'client-header',
  standalone: true,
  imports: [MatDividerModule, MatCardModule, MatSelectionList, MatListItem, CommonModule, MatButtonModule, RouterLink, MatInputModule, MatIconModule, MatMenuModule, CommonModule, TopHeaderComponent, MiddleHeaderComponent, BottomHeaderComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass'
})
export class HeaderComponent {

  imagePath: string | null = null;
  showDropdown = false;
  isAuthenticated: boolean = false;
  user: any;
  isMenuOpen: boolean[] = [false, false]; // Add more elements if needed
  isSubmenuOpen: any  = {
    leagues: false,
    footballcommunity: false,
    about: false
  };
  isMobileMenuOpen = false;
  
  constructor(
    private authService: AuthService,
    private googleService: GoogleService,
    private apiService: ApiService,
  ) {}

  toggleSubmenu(menuName: string) {
    Object.keys(this.isSubmenuOpen).forEach(key => {
      if (key !== menuName) {
        this.isSubmenuOpen[key] = false;
      }
    });
    this.isSubmenuOpen[menuName] = !this.isSubmenuOpen[menuName];
  
  }
  
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  ngOnInit() {
    this.imagePath = `${this.apiService.URL_LOGO_IMAGE}`;
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
  }

  logout(event: Event) {
    event.preventDefault();
    this.authService.logout();
  }

  toggleMenu(index: number) {
    this.isMenuOpen[index] = true;
  }
  closeMenu(){
    this.isMobileMenuOpen = false;
  }

  
  // toggleMobileMenu() {
  //   this.isMobileMenuOpen = !this.isMobileMenuOpen;
  // }

  

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

}
