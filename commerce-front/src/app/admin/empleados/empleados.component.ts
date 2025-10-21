import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../layout/header/header.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { User } from '../models/user.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, HttpClientModule],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})
export class EmpleadosComponent implements OnInit {

  usuarios: User[] = [];
  cargando = true;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.authService.getAllUsers().subscribe({
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

  crear() {
    this.router.navigate(['crearUser']);
  }

  editar(user: User) {
    this.router.navigate(['editarUser', user.idUsuario]);
  }

  eliminar(user: User){
    if (confirm(`¿Seguro que deseas eliminar a ${user.nombre}?`)) {
      this.authService.deleteUser(user.idUsuario).subscribe({
        next: () => {
          alert('Usuario Eliminado');
          this.cargarUsuarios();
        },
        error: (err) => {
          console.error(err);
          alert('Error al eliminar el usuario');
        }
      });
    }
  }
}
