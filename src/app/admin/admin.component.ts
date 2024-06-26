import { Component } from '@angular/core';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [DashboardComponent, RouterOutlet, MatSidenavModule, NavbarComponent, SidebarComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.sass',
})
export class AdminComponent {

}
