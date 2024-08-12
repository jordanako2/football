import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LeagueService } from '../../../../services/league.service';
import { ApiService } from '../../../../services/api.service';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { TeamService } from '../../../../services/team.service';
import { FormBuilder, FormGroup,ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-quickview',
  standalone: true,
  imports: [
    CommonModule, MatTableModule, MatTabsModule,MatSelectModule, MatFormFieldModule,ReactiveFormsModule
  ],
  templateUrl: './quickview.component.html',
  styleUrl: './quickview.component.sass'
})
export class QuickviewComponent {

  form: FormGroup;
  leagues: any[] = [];
  fixures: any[] = [];
  initialLeagueId: number | null = null;
  imagePath: string | null = null;
  teamId: number | null = null;
  slug: string | null = null;

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
