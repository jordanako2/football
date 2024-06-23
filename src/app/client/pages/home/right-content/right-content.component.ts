import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ContentsService } from '../../../../services/contents.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


export interface Tile {
  cols: number;
  rows: number;
  content: SafeHtml;
  height: number;
}


export interface Features {
  content: string;
}



@Component({
    selector: 'app-right-content',
    standalone: true,
    templateUrl: './right-content.component.html',
    styleUrl: './right-content.component.sass',
    imports: [MatGridListModule, CommonModule]
})
export class RightContentComponent implements OnInit {
  base64Image: string = '...';
  dataSource: Tile[] = [];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private _contentService: ContentsService,
    private _sanitizer: DomSanitizer
  ) {}

  ngOnInit() :void{
    this.getContent();
    
  }




  getContent():void {
    this._contentService.getContent().subscribe(
      (data: Features[]) => {
      // Update tiles based on fetched data
      this.updateTiles(data);
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
        content: this.sanitizeHtml(item.content),
        height: 300,
        cols: 4,
        rows: 2
      }));
    } else {
      this.dataSource = [
        { content: this.sanitizeHtml(featureData[0].content), height: 300, cols: 2, rows: 2 },
        { content: this.sanitizeHtml(featureData[1].content), height: 300, cols: 2, rows: 1 },
        { content: this.sanitizeHtml(featureData[2].content), height: 300, cols: 2, rows: 1 },
      ];
    }
  });
}

sanitizeHtml(html: string): SafeHtml {
  return this._sanitizer.bypassSecurityTrustHtml(html); // Use DomSanitizer to bypass security and sanitize HTML
}
}
