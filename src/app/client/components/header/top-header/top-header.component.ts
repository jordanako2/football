import { Component } from '@angular/core';
import { TeamService } from '../../../../services/team.service';
import { ApiService } from '../../../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-header.component.html',
  styleUrl: './top-header.component.sass'
})
export class TopHeaderComponent {

  dataSource: any[] = [];
  imagePath: string | null = null;

  constructor(
    private _teamService: TeamService,
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
