import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { LeaguesComponent } from '../../../components/leagues/leagues.component';

export interface PeriodicElement {
  team: string;
  position: number;
  played: number;
  gd: number;
  points: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, team: 'Huskies', played: 38, gd: 62, points: 91},
  {position: 2, team: 'Tigers', played: 38, gd: 62, points: 91},
  {position: 3, team: 'Panglao Dophins', played: 38, gd: 62, points: 91},
  {position: 4, team: 'Tubigon', played: 38, gd: 62, points: 91},
  {position: 5, team: 'Clarin', played: 38, gd: 62, points: 91},
  {position: 6, team: 'Sagbayan', played: 38, gd: 62, points: 91},
  {position: 7, team: 'Talibon', played: 38, gd: 62, points: 91},
  {position: 8, team: 'Alicia', played: 38, gd: 62, points: 91},
  {position: 9, team: 'Seirra Bullones', played: 38, gd: 62, points: 91},
  {position: 10, team: 'Gaher', played: 38, gd: 62, points: 91},
];

@Component({
  selector: 'app-left-content',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatTableModule, LeaguesComponent],
  templateUrl: './left-content.component.html',
  styleUrl: './left-content.component.sass'
})

export class LeftContentComponent {

  displayedColumns: string[] = ['position', 'team', 'played', 'gd', 'points'];
  dataSource = ELEMENT_DATA;
}
