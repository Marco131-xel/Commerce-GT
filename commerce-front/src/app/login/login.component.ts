import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      nombre: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { nombre, password} = this.loginForm.value;

      this.authService.login(nombre, password).subscribe({
        next: (resp) => {
          console.log('Inicio de sesion exitoso: ', resp);
          // ver su pagina
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Credenciales incorrectas';
        }
      });
    } else {
      this.errorMessage = 'Por favor completa los campos correctamente';
    }
  }
}
