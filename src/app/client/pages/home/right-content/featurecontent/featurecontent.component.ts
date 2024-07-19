import { Component } from '@angular/core';
import { ApiService } from '../../../../../services/api.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FeaturesService } from '../../../../../services/features.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-featurecontent',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule, RouterLink],
  templateUrl: './featurecontent.component.html',
  styleUrl: './featurecontent.component.sass'
})
export class FeaturecontentComponent {

  featureData: any[] = [];
  imagePath: string | null = null;
  imageLogoPath: string | null = null;

  constructor(
    private featureService: FeaturesService,
    private _configService: ApiService,
  ) {}

  ngOnInit() :void{
    this.getFeatureContent();
    this.imageLogoPath = `${this._configService.URL_LOGO_IMAGE}`;
  }

  getFeatureContent(): void {
    this.featureService.getContentFeatures().subscribe({
      next: (res) => {
        this.featureData = res.sort((a: any, b: any) => b.id - a.id);
        this.imagePath =`${this._configService.URL_CONTENT_IMAGE}`;
      },
      error: (err) => {
        console.error('Error fetching feature data:', err);
      }
    })
  }

}
