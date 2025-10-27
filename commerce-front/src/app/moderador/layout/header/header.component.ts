import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  nombreUsuario: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  // mostar el nombre del usuario
  ngOnInit(): void {
    this.nombreUsuario = localStorage.getItem('nombre');
  }

  // boton inicio
  inicio() {
    this.router.navigate(['/moderador']);
  }

  // boton productos
  productos() {
    this.router.navigate(['/solicitudProducto']);
  }

  // boton usuarios
  usuarios() {
    this.router.navigate(['/user-mod']);
  }

  // boton para perfil
  perfil() {
    this.router.navigate(['/perfilMod']);
  }
}
