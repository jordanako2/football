import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-middle-header',
  standalone: true,
  imports: [CommonModule, ],
  templateUrl: './middle-header.component.html',
  styleUrl: './middle-header.component.sass'
})
export class MiddleHeaderComponent {

  isMenuOpen: boolean[] = [false, false, false, false]; 

  toggleMenu(index: number) {
    this.isMenuOpen[index] = true;
  }
}
