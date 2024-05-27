import { Component } from '@angular/core';
import { TeamsComponent } from '../../components/teams/teams.component';
import { MatButton } from '@angular/material/button';
import { LeftContentComponent } from './left-content/left-content.component';
import { RightContentComponent } from './right-content/right-content.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

export interface PeriodicElement {
  team: string;
  position: number;
  played: number;
  gd: number;
  points: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, team: 'Hydrogen', played: 38, gd: 62, points: 91},
  {position: 2, team: 'Helium', played: 38, gd: 62, points: 91},
  {position: 3, team: 'Lithium', played: 38, gd: 62, points: 91},
  {position: 4, team: 'Beryllium', played: 38, gd: 62, points: 91},
  {position: 5, team: 'Boron', played: 38, gd: 62, points: 91},
  {position: 6, team: 'Carbon', played: 38, gd: 62, points: 91},
  {position: 7, team: 'Nitrogen', played: 38, gd: 62, points: 91},
  {position: 8, team: 'Oxygen', played: 38, gd: 62, points: 91},
  {position: 9, team: 'Fluorine', played: 38, gd: 62, points: 91},
  {position: 10, team: 'Neon', played: 38, gd: 62, points: 91},
  {position: 1, team: 'Hydrogen', played: 38, gd: 62, points: 91},
  {position: 2, team: 'Helium', played: 38, gd: 62, points: 91},
  {position: 3, team: 'Lithium', played: 38, gd: 62, points: 91},
  {position: 4, team: 'Beryllium', played: 38, gd: 62, points: 91},
  {position: 5, team: 'Boron', played: 38, gd: 62, points: 91},
  {position: 6, team: 'Carbon', played: 38, gd: 62, points: 91},
  {position: 7, team: 'Nitrogen', played: 38, gd: 62, points: 91},
  {position: 8, team: 'Oxygen', played: 38, gd: 62, points: 91},
  {position: 9, team: 'Fluorine', played: 38, gd: 62, points: 91},
  {position: 10, team: 'Neon', played: 38, gd: 62, points: 91},
];

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TeamsComponent, MatButton, LeftContentComponent, RightContentComponent, MatTableModule, MatIconModule, MatCardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})
export class HomeComponent {

  displayedColumns: string[] = ['position', 'team', 'played', 'gd', 'points'];
  dataSource = ELEMENT_DATA;

}
