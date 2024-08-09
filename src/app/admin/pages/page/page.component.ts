import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { QuillModule } from 'ngx-quill';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CoreService } from '../../../core/core.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { PageAddEditComponent } from './page-add-edit/page-add-edit.component';
import { PageService } from '../../../services/page.service';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [
    QuillModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatSnackBarModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './page.component.html',
  styleUrl: './page.component.sass'
})
export class PageComponent implements OnInit {
  displayedColumns: string[] = ['name', 'slug', 'status', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog, 
    private pageService: PageService,
    private _core: CoreService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.getContent();
  }

  getContent(){
    this.pageService.getPages().subscribe({
      next:(res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddEditContentForm() {
    const dialogRef = this._dialog.open(PageAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getContent();
        }
      },
      error: (err) => {
        console.log(err);
      }
      
    })
  }

  openEditContent(data: any) {
    this._router.navigate(['/admin/page/edit', data.id]);
  }

  deleteContent(id: number) {
    this.pageService.deletePage(id).subscribe({
      next: (res) => {
        this._core.openSnackBar('Page deleted successfully', 'DONE')
        this.getContent();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
