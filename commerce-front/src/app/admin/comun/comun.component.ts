import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../layout/header/header.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { User } from '../models/user.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comun',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, HttpClientModule],
  templateUrl: './comun.component.html',
  styleUrl: './comun.component.css'
})
export class ComunComponent implements OnInit{

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
