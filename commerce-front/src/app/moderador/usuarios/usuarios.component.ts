import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../layout/header/header.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { User } from '../../admin/models/user.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, HttpClientModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {
  usuarios: User[] = [];
  cargando = true;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.authService.getAllComunUsers().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al obtener usuarios', err);
        this.cargando = false;
      }
    });
  }

  suspender(user: User) {
    if (confirm(`¿Seguro que deseas suspender a ${user.nombre}?`)) {
      this.authService.suspenderUsuario(user.idUsuario!).subscribe({
        next: (res) => {
          alert(res.message);
          this.cargarUsuarios();
        },
        error: (err) => {
          console.error('Error al suspender usuario:', err);
          alert('Ocurrió un error al suspender el usuario');
        }
      });
    }
  }

  activar(user: User) {
    if (confirm(`¿Deseas activar nuevamente a ${user.nombre}?`)) {
      this.authService.activarUsuario(user.idUsuario!).subscribe({
        next: (res) => {
          alert(res.message);
          this.cargarUsuarios();
        },
        error: (err) => {
          console.error('Error al activar usuario:', err);
          alert('Ocurrió un error al activar el usuario');
        }
      });
    }
  }


}
