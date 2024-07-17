import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-top-footer',
  standalone: true,
  imports: [
    MatIconModule,
    RouterLink
  ],
  templateUrl: './top-footer.component.html',
  styleUrl: './top-footer.component.sass'
})
export class TopFooterComponent {

}
