import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-facebook',
  standalone: true,
  imports: [],
  templateUrl: './facebook.component.html',
  styleUrl: './facebook.component.sass'
})
export class FacebookComponent {

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  loginfb(): void {
    this.authService.loginfb();
  }

}
