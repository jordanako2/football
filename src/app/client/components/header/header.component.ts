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

@Component({
  selector: 'client-header',
  standalone: true,
  imports: [MatDividerModule, MatCardModule, MatSelectionList, MatListItem, CommonModule, MatButtonModule, RouterLink, MatInputModule, MatIconModule, MatMenuModule, CommonModule, TopHeaderComponent, MiddleHeaderComponent, BottomHeaderComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass'
})
export class HeaderComponent {

  showDropdown = false;
  isAuthenticated: boolean = false;
  user: any;
  isMenuOpen: boolean[] = [false, false]; // Add more elements if needed
  // isMobileMenuOpen = false;
  
  constructor(
    private authService: AuthService,
    private googleService: GoogleService
  ) {}

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

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
  }

  logout(event: Event) {
    event.preventDefault();
    this.authService.logout();
    window.location.reload();
  }

  toggleMenu(index: number) {
    this.isMenuOpen[index] = true;
  }

  isMenuVisible = false;

  // toggleMobileMenu() {
  //   this.isMobileMenuOpen = !this.isMobileMenuOpen;
  // }

  isMobileMenuOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

}
