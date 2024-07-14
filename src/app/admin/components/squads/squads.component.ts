import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { SquadAddEditComponent } from './squad-add-edit/squad-add-edit.component';
import { TeamService } from '../../../services/team.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CoreService } from '../../../core/core.service';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SquadService } from '../../../services/squad.service';

@Component({
  selector: 'app-squads',
  standalone: true,
  imports: [RouterLink, CommonModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, MatSnackBarModule],
  templateUrl: './squads.component.html',
  styleUrl: './squads.component.sass'
})
export class SquadsComponent {
  displayedColumns: string[] = ['first_name', 'last_name', 'position', 'stat', 'action'];
  teamId: number | null = null;
  dataSource!: MatTableDataSource<any>;
  imagePath: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private _dialog: MatDialog, 
    private route: ActivatedRoute,
    private squadService: SquadService,
    private teamService: TeamService,
    private _coreService: CoreService,
    private _configService: ApiService,
  ) {}

  ngOnInit(): void {
    this.imagePath =`${this._configService.URL_IMAGE}`;
    this.route.params.subscribe(params => {
      this.teamId = +params['id'];  
      this.getSquadByTeamId(this.teamId);
    });
  }

  getSquadByTeamId(teamId: number) {
    this.teamService.getSquadByTeamId(teamId).subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res.squad);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  
  openAddEditTeamForm() {
    const dialogRef = this._dialog.open(SquadAddEditComponent, {
      data: { teamId: this.teamId }
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val && this.teamId) {
          this.getSquadByTeamId(this.teamId);
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteSquad(id: number) {
    this.squadService.deleteSquad(id).subscribe({
      next: (res) => {
        if (this.teamId) {
          this._coreService.openSnackBar('Team deleted successfully', 'DONE')
          this.getSquadByTeamId(this.teamId);
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(SquadAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
        next: (val) => {
          if (val && this.teamId) {
            this.getSquadByTeamId(this.teamId);
          }
        },
        error: (err) => {
          console.log(err);
        }
      })
  }
}
