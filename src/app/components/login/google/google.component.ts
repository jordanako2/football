import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-google',
  standalone: true,
  imports: [],
  templateUrl: './google.component.html',
  styleUrl: './google.component.sass'
})
export class GoogleComponent {

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  login(): void {
    // this.authService.logingoogle();
    
  }


}
