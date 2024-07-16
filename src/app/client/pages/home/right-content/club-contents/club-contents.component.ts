import { Component } from '@angular/core';
import { ContentsService } from '../../../../../services/contents.service';
import { ApiService } from '../../../../../services/api.service';
import { NewsService } from '../../../../../services/news.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-club-contents',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './club-contents.component.html',
  styleUrl: './club-contents.component.sass'
})
export class ClubContentsComponent {

  clubNewsData: any[] = [];
  imagePath: string | null = null;
  imageLogoPath: string | null = null;

  constructor(
    private newsService: NewsService,
    private _configService: ApiService,
  ) {}

  ngOnInit() :void{
    this.getClubContent();
    this.imageLogoPath = `${this._configService.URL_LOGO_IMAGE}`;
  }

  getClubContent(): void {
    this.newsService.getClubContents().subscribe({
      next: (res) => {
        this.clubNewsData = res.sort((a: any, b: any) => b.id - a.id);
        this.imagePath =`${this._configService.URL_CONTENT_IMAGE}`;
      },
      error: (err) => {
        console.error('Error fetching feature data:', err);
      }
    })
  }


}
