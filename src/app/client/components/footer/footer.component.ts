import { Component } from '@angular/core';
import { TopFooterComponent } from "./top-footer/top-footer.component";
import { BottomFooterComponent } from "./bottom-footer/bottom-footer.component";

@Component({
  selector: 'client-footer',
  standalone: true,
  imports: [TopFooterComponent, BottomFooterComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.sass'
})
export class FooterComponent {

}
