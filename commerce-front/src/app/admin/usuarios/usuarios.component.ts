import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../layout/header/header.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, CommonModule, FormsModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
  user = {
    nombre: '',
    apellido: '',
    correo: '',
    contrasena: '',
    telefono: '',
    direccion: '',
    tipoUsuario: 'ADMINISTRADOR'
  };

  tiposUsuario = ['ADMINISTRADOR', 'LOGISTICA', 'MODERADOR'];
  cargando = false;
  errorMsg = '';

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      Object.values(form.controls).forEach((control: any) => {
        control.markAsTouched();
      });
      return;
    }
    this.authService.register(this.user).subscribe({
      next: (response) => {
        console.log('Registro exitoso', response);
        alert('Usuario creado');
        this.regresar();
      },
      error: (error) => {
        console.log('Error al registrar', error);
        alert('Error al crear usuario');
      }
    });
  }

  regresar() {
    this.router.navigate(['/empleados']);
  }
}
