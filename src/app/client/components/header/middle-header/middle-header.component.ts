import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-middle-header',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterLink],
  templateUrl: './middle-header.component.html',
  styleUrl: './middle-header.component.sass'
})
export class MiddleHeaderComponent {

  constructor(private authService: AuthService) {}

  isMenuOpen: boolean[] = [false, false, false, false]; 
  isAuthenticated: boolean = false;
  user: any;

  ngOnInit() {
    // Check authentication status
    this.isAuthenticated = this.authService.isAuthenticated();
    this.user = this.authService.getUser();
  }

  toggleMenu(index: number) {
    this.isMenuOpen[index] = true;
  }

  logout(event: Event) {
    event.preventDefault();
    this.authService.logout();
    // window.location.reload();
  }
}
