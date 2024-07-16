import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { QuillModule } from 'ngx-quill';
import { TeamAboutService } from '../../../services/team-about.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ContentsService } from '../../../services/contents.service';
import { ApiService } from '../../../services/api.service';
import { TeamService } from '../../../services/team.service';
import { GalleryService } from '../../../services/gallery.service';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [QuillModule, CommonModule, MatSelectModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.sass'
})
export class OverviewComponent {

  teamId: number | null = null;
  aboutData: any | null = null;
  contentData: any[] | null = null;
  content: SafeHtml  | null = null;
  imagePath: string | null = null;
  imageGalleryPath: string | null = null;
  imageLogoPath: string | null = null;
  galleryData: any[] | null = null;
  teamLogo: string | null = null;

  constructor (
    private route: ActivatedRoute,
    private teamAboutService: TeamAboutService,
    private contentService: ContentsService,
    private galleryService: GalleryService,
    private teamService: TeamService,
    private _configService: ApiService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.imagePath = `${this._configService.URL_CONTENT_IMAGE}`;
    this.imageGalleryPath = `${this._configService.URL_IMAGE}`;
    this.imageLogoPath = `${this._configService.URL_IMAGE}`;
    this.route.params.subscribe(params => {
      this.teamId = +params['id'];
      if (this.teamId) {
        this.getTeamAboutByTeamId(this.teamId);
        this.getContentByTeamId(this.teamId);
        this.getTeamById(this.teamId);
        this.getGalleryByTeamId(this.teamId);
      }
    });
  }

  getImageGroups(): any[][] {
    const chunkSize = 15;
    const result = [];
    if (this.galleryData) {
      for (let i = 0; i < this.galleryData.length; i += chunkSize) {
          result.push(this.galleryData.slice(i, i + chunkSize));
      }
    }
    return result;
  }

  getTeamAboutByTeamId(teamId: number) {
    this.teamAboutService.getTeamAboutByTeamId(teamId).subscribe({
      next: (res) => {
        this.aboutData = res;
        this.content = this.sanitizer.bypassSecurityTrustHtml(res.desktop_content);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getContentByTeamId(teamId: number) {
    this.contentService.getContentByTeamId(teamId).subscribe({
      next: (res) => {
        this.contentData = res
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  getTeamById(teamId: number) {
    this.teamService.getTeamById(teamId).subscribe({
      next: (res) => {
        this.teamLogo = res.file_name
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  getGalleryByTeamId(teamId: number) {
    this.galleryService.getGalleryByTeamId(teamId).subscribe({
      next: (res) => {
        this.galleryData = res
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

}
