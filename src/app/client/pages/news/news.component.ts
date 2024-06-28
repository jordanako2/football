import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ContentsService } from '../../../services/contents.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule,MatCardModule, RouterLink],
  templateUrl: './news.component.html',
  styleUrl: './news.component.sass'
})
export class NewsComponent {

  imagePath: string | null = null;
  dataSource: any[] = [];

  constructor(
    private _contentService: ContentsService,
    private _configService: ApiService,
  ) {}

  getContent() {
    this._contentService.getContent().subscribe({
      next: (res) => {
        this.dataSource = res;
        this.imagePath =`${this._configService.URL_CONTENT_IMAGE}`;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  ngOnInit(): void {
    this.getContent();
  }


  applyFilter(event: Event) {
  }
}
