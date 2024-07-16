import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { LeagueService } from '../../../services/league.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TeamService } from '../../../services/team.service';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-fixures',
  standalone: true,
  imports: [MatSelectModule, MatFormFieldModule, CommonModule, ReactiveFormsModule],
  templateUrl: './fixures.component.html',
  styleUrl: './fixures.component.sass'
})
export class FixuresComponent {
  form: FormGroup;
  leagues: any[] = [];
  fixures: any[] = [];
  initialLeagueId: number | null = null;
  imagePath: string | null = null;
  teamId: number | null = null;

  constructor (
    private fb: FormBuilder,
    private leagueService: LeagueService,
    private teamService: TeamService,
    private configService: ApiService,
    private route: ActivatedRoute,
  ) {
    this.form = this.fb.group({
      league: ['']
    });
  }

  ngOnInit(): void {
    this.getLeagues();
    this.imagePath = `${this.configService.URL_IMAGE}`;
    this.route.params.subscribe(params => {
      this.teamId = +params['id'];  
      if (this.initialLeagueId && this.teamId) {
        this.getTeamFixures(this.initialLeagueId, this.teamId);
      }
    });
  }

  getLeagues() {
    this.leagueService.getLeagues().subscribe({
      next: (res: any[]) => {
        this.leagues = res.filter(league => league.status === 'Posted' || league.status === 'Completed')
        this.initialLeagueId = res[0].id
        if (this.initialLeagueId && this.teamId) {
          this.getTeamFixures(this.initialLeagueId, this.teamId);
          this.form.patchValue({ league: this.initialLeagueId }); 
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getTeamFixures(leagueId: number, teamId: number) {
    this.teamService.getTeamFixures(leagueId, teamId).subscribe({
      next: (res: any[]) => {
        this.fixures = res.map(item => item.match);  
      },
      error: (err) => {
        console.error('Error fetching fixtures:', err);
      }
    });
  }

  onLeagueChange(leagueId: number) {
    this.getTeamFixures(leagueId, this.teamId!); 
  }

}
