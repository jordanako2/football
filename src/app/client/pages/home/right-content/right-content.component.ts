import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ContentsService } from '../../../../services/contents.service';
import { ApiService } from '../../../../services/api.service';
import { RouterOutlet } from '@angular/router';
import { NewscontentComponent } from './newscontent/newscontent.component';
import { FeaturecontentComponent } from './featurecontent/featurecontent.component';

export interface Tile {
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
}



@Component({
    selector: 'app-right-content',
    standalone: true,
    templateUrl: './right-content.component.html',
    styleUrl: './right-content.component.sass',
    imports: [MatGridListModule, CommonModule,RouterOutlet,NewscontentComponent,FeaturecontentComponent]
})
export class RightContentComponent implements OnInit {
  dataSource: Tile[] = [];
  imagePath: string | null = null;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private _contentService: ContentsService,
    private _configService: ApiService,
  ) {}

  ngOnInit() :void{
    // this.getContent();
    
  }




  // getContent():void {
  //   this._contentService.getContent().subscribe(
  //     (data: Features[]) => {
  //     // Update tiles based on fetched data
  //     this.updateTiles(data);
  //     this.imagePath =`${this._configService.URL_CONTENT_IMAGE}`;
  //   },
  //   (error) => {
  //     console.error('Error fetching feature data:', error);
  //   }
  // );
  // }


updateTiles(featureData: Features[]): void {
  this.breakpointObserver.observe(['(max-width: 600px)']).subscribe((state: BreakpointState) => {
    if (state.matches) {
      this.dataSource = featureData.map(item => ({
        title: item.title,
        description: item.description,
        file_name: item.file_name,
        height: 300,
        cols: 1,
        rows: 1
      }));
    } else {
      this.dataSource = [
        {
          title:featureData[0].title,
          description:featureData[0].description,
          file_name: featureData[0].file_name,
          height: 300,
          cols: 1,
          rows: 1
        },
        {
          title: featureData[1].title,
          description: featureData[1].description,
          file_name: featureData[1].file_name,
          height: 300,
          cols: 1,
          rows: 1
        },
        {
          title: featureData[2].title,
          description:featureData[2].description,
          file_name: featureData[2].file_name,
          height: 300,
          cols: 1,
          rows: 1
        }
        ,
        {
          title: featureData[3].title,
          description:featureData[3].description,
          file_name: featureData[3].file_name,
          height: 300,
          cols: 1,
          rows: 1
        }
      ];
    }
  });
}
}
