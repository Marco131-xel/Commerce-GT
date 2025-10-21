import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../../user/layout/footer/footer.component";
import { HeaderComponent } from "../../user/layout/header/header.component";
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, CommonModule, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {

  user: any = {};
  editMode: boolean = false;

  nombreUsuario: string | null = null;
  
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

  // cambiar al modo edición
  toggleEdit() {
    this.editMode = !this.editMode;
  }

  // guardar cambios
  updateProfile() {
    this.authService.updateProfile(this.user).subscribe({
      next: (res) => {
        alert('Perfil actualizado');
        this.editMode = false;
        this.loadUserProfile();
      },
      error: (err) => {
        console.error(err);
        alert('Error al actualizar el perfil');
      }
    });
  }

  // eliminar cuenta
  deleteAccount() {
    const confirmDelete = confirm('¿Seguro que deseas eliminar tu cuenta? Esta acción no se puede deshacer.');
    if (!confirmDelete) return;

    this.authService.deleteAccount().subscribe({
      next: (res) => {
        alert('Cuenta eliminada');
        this.authService.logout();
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
        alert('No se pudo eliminar la cuenta');
      }
    });
  }

  //Cerrar sesión
  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
