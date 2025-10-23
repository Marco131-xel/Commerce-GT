import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
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
    this.router.navigate(['/user'])
  }
  perfil(){
    this.router.navigate(['/perfil']);
  }
  mi_producto() {
    this.router.navigate(['/mi-producto']);
  }
}
