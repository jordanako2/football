import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TeamService } from '../../../services/team.service';
import { CoreService } from '../../../core/core.service';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, CommonModule, RouterLink],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.sass'
})
export class TeamsComponent {
  dataSource: any[] = [];
  imagePath: string | null = null;

  constructor(
    private _teamService: TeamService,
    private _configService: ApiService,
    private _titleService: Title
  ) {}

  ngOnInit(): void {
    this.setTitle('Clubs');
    this.getTeams();
  }
  setTitle(newTitle: string) {
    this._titleService.setTitle(newTitle);
  }
  
  getTeams() {
    this._teamService.getTeams().subscribe({
      next: (res) => {
        this.dataSource = res;
        this.imagePath =`${this._configService.URL_IMAGE}`;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
