import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../layout/header/header.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {

  user: any = {};
  editMode: boolean = false;

  nombreUsuario: string | null = null;
  tarjeta: any = null;
  
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  // cargar datos 
  loadUserProfile() {
    this.authService.getProfile().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        console.error('Error al cargar el perfil:', err);
        if (err.status === 401) {
          this.router.navigate(['/login']);
        }
      }
    });
  }

  // volver al inicio
  inicio() {
    this.router.navigate(['/moderador']);
  }

  //Cerrar sesión
  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
