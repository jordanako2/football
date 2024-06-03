import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { RegisterComponent } from '../components/register/register.component';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet, LoginComponent, ProfileComponent, RegisterComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.sass'
})
export class ClientComponent {

}
