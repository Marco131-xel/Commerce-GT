import { Component } from '@angular/core';
//import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RegisterComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'commerce-front';
}
