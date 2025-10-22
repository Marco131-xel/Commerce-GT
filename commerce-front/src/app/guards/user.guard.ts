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
export class UserGuard implements CanActivate {
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

      if (decoded.role !== 'COMUN') {
        this.router.navigate(['/admin']);
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
