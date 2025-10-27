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
  inicio() {
    this.router.navigate(['/logistica']);
  }
  pedido() {
    this.router.navigate(['/pedido-logi']);
  }
  perfil() {
    this.router.navigate(['/perfil-logi']);
  }

}
