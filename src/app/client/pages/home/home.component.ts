import { Component } from '@angular/core';
import { TeamsComponent } from '../../components/teams/teams.component';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TeamsComponent, MatButton],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})
export class HomeComponent {

}
