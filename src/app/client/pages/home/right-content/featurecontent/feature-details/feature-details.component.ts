import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NewsService } from '../../../../../../services/news.service';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../../../services/api.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-feature-details',
  standalone: true,
  imports: [RouterLink, CommonModule,],
  templateUrl: './feature-details.component.html',
  styleUrl: './feature-details.component.sass'
})
export class FeatureDetailsComponent {
  title: string | null = null;
  content: SafeHtml  | null = null;
  imagePath: string | null = null;
  newsId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private _featureService: NewsService,
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
    this._featureService.getContentById(newsId).subscribe(
      (response) => {
        this.title = response.title
        this.imagePath =`${this._configService.URL_CONTENT_IMAGE}/${response.file_name}`;
        this.content = response.content
        
      },
      (error) =>{
        console.error('Error fetching news:', error)
      }
    )
  };

  sanitizeHtml(html: string): void {
    this.content = this.sanitizer.bypassSecurityTrustHtml(html);
  }

}
