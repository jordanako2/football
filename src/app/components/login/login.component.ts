import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { GoogleComponent } from './google/google.component';
import { HeaderComponent } from '../../client/components/header/header.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FacebookComponent } from './facebook/facebook.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [GoogleComponent, HeaderComponent, MatFormFieldModule, MatInputModule, MatButtonModule, FacebookComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent {

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  login(): void {
    this.authService.login();
  }
  

}
