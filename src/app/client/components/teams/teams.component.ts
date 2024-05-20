import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TeamService } from '../../../services/team.service';
import { CoreService } from '../../../core/core.service';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, CommonModule],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.sass'
})
export class TeamsComponent {
  dataSource: any[] = [];
  imagePath: string | null = null;

  constructor(
    private _teamService: TeamService,
    private _coreService: CoreService,
    private _configService: ApiService,
  ) {}

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

  ngOnInit(): void {
    this.getTeams();
  }

}
