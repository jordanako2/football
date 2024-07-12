import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { LeagueService } from '../../../services/league.service';

@Component({
  selector: 'app-fixures',
  standalone: true,
  imports: [MatSelectModule, MatFormFieldModule, CommonModule],
  templateUrl: './fixures.component.html',
  styleUrl: './fixures.component.sass'
})
export class FixuresComponent {

  leagues: any[] = [];

  constructor (
    private leagueService: LeagueService
  ) {}

  ngOnInit(): void {
    this.getLeagues();
  }

  getLeagues() {
    this.leagueService.getLeagues().subscribe({
      next: (res: any[]) => {
        this.leagues = res.filter(league => league.status === 'Posted' || league.status === 'Completed');
        console.log(res)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
