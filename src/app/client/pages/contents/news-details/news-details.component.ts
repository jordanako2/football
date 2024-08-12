import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NewsService } from '../../../../services/news.service';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../services/api.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { QuillModule } from 'ngx-quill';
@Component({
  selector: 'app-news-details',
  standalone: true,
  imports: [RouterLink, CommonModule, QuillModule],
  templateUrl: './news-details.component.html',
  styleUrl: './news-details.component.sass'
})
export class NewsDetailsComponent{
  title: string | null = null;
  content: string = '';
  imagePath: string | null = null;
  newsId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private _newsService: NewsService,
    private _configService: ApiService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.imagePath = `${this._configService.URL_IMAGE}`;
    this.route.params.subscribe(params => {
      this.newsId = +params['id'];  
      if (this.newsId){
        this.getContentById(this.newsId);
      }
    });
  }

  getContentById(newsId: number): void {
    this._newsService.getContentById(newsId).subscribe({
      next: (res) => {
        this.title = res.title
        this.imagePath =`${this._configService.URL_CONTENT_IMAGE}/${res.file_name}`;
        this.content = res.content;
      },
      error: (err) => {
        console.log(err);
        this.content = ''
      }
    })
  };


}
