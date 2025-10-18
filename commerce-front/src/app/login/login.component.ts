import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  login = {
    correo: '',
    contrasena: ''
  };

  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.errorMessage = null;

    this.authService.login(this.login.correo, this.login.contrasena).subscribe({
      next: (Response) => {
        console.log('Inicio exitoso', Response);
        alert('Inicio exitoso');

        localStorage.setItem('token', Response.token);
      },
      error: (error) => {
        console.log('Error al iniciar sesion', error);
        this.errorMessage = error.error?.error || 'Correo o Contraseña Incorrectos';
      }
    });
  }

  registrar() {
    this.router.navigate(['/registrar']);
  }
}