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
import { ContentAddEditComponent } from './content-add-edit/content-add-edit.component';
import { ContentsService } from '../../../services/contents.service';
import { CoreService } from '../../../core/core.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-news',
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
  templateUrl: './news.component.html',
  styleUrl: './news.component.sass'
})
export class NewsComponent implements OnInit{
  displayedColumns: string[] = ['title', 'created_on', 'status', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog, 
    private _contentService: ContentsService,
    private _core: CoreService
  ) {}

  ngOnInit(): void {
    this.getContent();
  }

  getContent(){
    this._contentService.getContent().subscribe({
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
    const dialogRef = this._dialog.open(ContentAddEditComponent);
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
  const dialogRef = this._dialog.open(ContentAddEditComponent, {
    data,
  });

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
deleteContent(id: number) {
  this._contentService.deleteContent(id).subscribe({
    next: (res) => {
      this._core.openSnackBar('Content deleted successfully', 'DONE')
      this.getContent();
    },
    error: (err) => {
      console.log(err);
    }
  })
}
}
