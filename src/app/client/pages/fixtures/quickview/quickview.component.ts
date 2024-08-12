import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { LeagueService } from '../../../../services/league.service';
import { ApiService } from '../../../../services/api.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-quickview',
  standalone: true,
  imports: [
    CommonModule, MatTableModule, MatTabsModule,MatSelectModule, MatFormFieldModule, MatIconModule
  ],
  templateUrl: './quickview.component.html',
  styleUrl: './quickview.component.sass'
})
export class QuickviewComponent implements OnInit {
  imagePath: string | null = null;
  matches: any = {};
  leagueMatches: any[] = [];
  
  constructor(
    private router: Router, 
    private leagueService: LeagueService,
    private configService: ApiService,
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.matches = navigation?.extras.state?.['matches'];
  }

  ngOnInit(): void {
    this.imagePath = `${this.configService.URL_IMAGE}`;
    this.getLeagueTeams();
    
  }
  getLeagueTeams() {
    this.leagueService.getLeagueMatches().subscribe({
      next: (res) => {
        this.leagueMatches = res;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
