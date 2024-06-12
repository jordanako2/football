import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ RouterModule, MatListModule, MatIconModule ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.sass'
})
export class SidebarComponent {

}
