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

@Component({
  selector: 'client-header',
  standalone: true,
  imports: [MatButtonModule, RouterLink, MatInputModule, MatIconModule, MatMenuModule, CommonModule, TopHeaderComponent, MiddleHeaderComponent, BottomHeaderComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass'
})
export class HeaderComponent {

  isMenuOpen: boolean[] = [false, false]; // Add more elements if needed

  toggleMenu(index: number) {
    this.isMenuOpen[index] = true;
  }

}
