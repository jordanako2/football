import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

export interface Tile {
  cols: number;
  rows: number;
  title: string;
  img: string;
  paragraph: string;
  height: number;
}

export interface Features {
  image: string;
  title: string;
  paragraph: string;
}

const featureData: Features[] = [
  {
    image: 'assets/feature.jpg',
    title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', 
    paragraph: 'Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 
  },
  {
    image: 'assets/feature2.jpg',
    title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', 
    paragraph: 'Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 
  },
  {
    image: 'assets/feature3.jpg',
    title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', 
    paragraph: 'Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 
  },
];

@Component({
  selector: 'app-right-content',
  standalone: true,
  imports: [MatGridListModule, CommonModule],
  templateUrl: './right-content.component.html',
  styleUrl: './right-content.component.sass'
})
export class RightContentComponent {

  tiles: Tile[] = [];

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.breakpointObserver.observe(['(max-width: 600px)']).subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.tiles = [
          {title: featureData[0].title, img: featureData[0].image, paragraph: featureData[0].paragraph, height: 300, cols: 4, rows: 2},
          {title: featureData[1].title, img: featureData[1].image, paragraph: featureData[1].paragraph, height: 300, cols: 4, rows: 2},
          {title: featureData[2].title, img: featureData[2].image, paragraph: featureData[2].paragraph, height: 300, cols: 4, rows: 2},
        ];
      } else {
        this.tiles = [
          {title: featureData[0].title, img: featureData[0].image, paragraph: featureData[0].paragraph, height: 300, cols: 2, rows: 2},
          {title: '', img: featureData[1].image, paragraph: featureData[1].paragraph, height: 300, cols: 2, rows: 1},
          {title: '', img: featureData[2].image, paragraph: featureData[2].paragraph, height: 300, cols: 2, rows: 1},
        ];
      }
    });
  }


}
