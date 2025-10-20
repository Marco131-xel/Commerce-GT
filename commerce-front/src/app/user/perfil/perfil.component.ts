import { Component } from '@angular/core';
import { FooterComponent } from "../../user/layout/footer/footer.component";
import { HeaderComponent } from "../../user/layout/header/header.component";
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

  nombreUsuario: string | null = null;
  
  constructor(private authService: AuthService, private router: Router) {}
  
  // mostar el nombre del usuario
  ngOnInit(): void {
    this.nombreUsuario = localStorage.getItem('nombre');
  }

  // cerrar sesion
  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
