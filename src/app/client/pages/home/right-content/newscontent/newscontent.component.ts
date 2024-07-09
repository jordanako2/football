import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { ApiService } from '../../../../../services/api.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { NewsService } from '../../../../../services/news.service';
import { RouterLink } from '@angular/router';




export interface Tile {
id: any;
  cols: number;
  rows: number;
  title: string;
  description: string;
  file_name: string;
  height: number;
  
}


export interface Features {
  title: string;
  description: string;
  file_name: string;
  id: number;
}



@Component({
  selector: 'app-newscontent',
  standalone: true,
  imports: [MatGridListModule, CommonModule, RouterLink],
  templateUrl: './newscontent.component.html',
  styleUrl: './newscontent.component.sass'
})
export class NewscontentComponent {
  dataSource: Tile[] = [];
  imagePath: string | null = null;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private _contentService: NewsService,
    private _configService: ApiService,
  ) {}

  ngOnInit() :void{
    this.getContent();
    
  }




  getContent():void {
    this._contentService.getContent().subscribe(
      (data: Features[]) => {
      // Update tiles based on fetched data
      this.updateTiles(data);
      this.imagePath =`${this._configService.URL_CONTENT_IMAGE}`;
    },
    (error) => {
      console.error('Error fetching feature data:', error);
    }
  );
  }


updateTiles(featureData: Features[]): void {
  this.breakpointObserver.observe(['(max-width: 600px)']).subscribe((state: BreakpointState) => {
    if (state.matches) {
      this.dataSource = featureData.map(item => ({
        title: item.title,
        description: item.description,
        file_name: item.file_name,
        height: 200,
        cols: 6,
        rows: 2,
        id: item.id
      }));
    } else {
      this.dataSource = [
        {
          title:featureData[0].title,
          description:featureData[0].description,
          file_name: featureData[0].file_name,
          id: featureData[0].id,
          height: 400,
          cols: 4,
          rows: 2
        },
        {
          title: featureData[1].title,
          description: featureData[1].description,
          file_name: featureData[1].file_name,
          id: featureData[1].id,
          height: 200,
          cols: 2,
          rows: 1
        },
        {
          title: featureData[2].title,
          description:featureData[2].description,
          file_name: featureData[2].file_name,
          id: featureData[2].id,
          height: 200,
          cols: 2,
          rows: 1
        }
      ];
    }
  });
}

}
