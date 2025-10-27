import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  sub: string;
  role: string;
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/']);
      return false;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decoded.exp < currentTime) {
        localStorage.removeItem('token');
        this.router.navigate(['/']);
        return false;
      }

      if (decoded.role !== 'ADMINISTRADOR') {
        switch (decoded.role) {
          case 'COMUN':
            this.router.navigate(['/user']);
            break;
          case 'MODERADOR':
            this.router.navigate(['/moderador']);
            break;
          case 'LOGISTICA':
            this.router.navigate(['/logistica']);
            break;
          default:
            this.router.navigate(['/']);
        }
        return false;
      }

      return true;
    } catch (error) {
      console.error('Token inválido:', error);
      localStorage.removeItem('token');
      this.router.navigate(['/']);
      return false;
    }
  }
}
