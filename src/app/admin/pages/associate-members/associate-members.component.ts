import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AssociateMemberService } from './associate-members.service';
import { AssociateMemberAddEditComponent } from './associate-member-add-edit/associate-member-add-edit.component';
import { CoreService } from '../../../core/core.service';

@Component({
  selector: 'app-associate-members',
  standalone: true,
  imports: [
    CommonModule, 
    MatButtonModule, 
    MatDialogModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatTableModule, 
    MatSortModule, 
    MatPaginatorModule, 
    MatIconModule, 
    MatSnackBarModule
  ],
  templateUrl: './associate-members.component.html',
  styleUrl: './associate-members.component.sass'
})
export class AssociateMembersComponent {
  displayedColumns: string[] = ['firstName', 'lastName', 'associationId', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog, 
    private associateMemberService: AssociateMemberService,
    private coreService: CoreService,
  ) {}

  ngOnInit(): void {
    this.getAssociationMembers();
  }
  
  openAddForm() {
    const dialogRef = this.dialog.open(AssociateMemberAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAssociationMembers();
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  openEditForm(data: any) {
    const dialogRef = this.dialog.open(AssociateMemberAddEditComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAssociationMembers();
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getAssociationMembers() {
    this.associateMemberService.getAssociateMembers().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
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

  deleteAssociateMember(id: number) {
    this.associateMemberService.deleteAssociateMember(id).subscribe({
      next: (res) => {
        this.coreService.openSnackBar('Associate member deleted successfully', 'DONE')
        this.getAssociationMembers();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
