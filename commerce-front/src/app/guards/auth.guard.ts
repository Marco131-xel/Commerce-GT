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
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/']);
      return false;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const currenTime = Math.floor(Date.now() / 1000);

      // si el token expiro
      if (decoded.exp < currenTime) {
        localStorage.removeItem('token');
        this.router.navigate(['/']);
        return false;
      }

      return true;
    } catch (e) {
      console.error('Token Invalido',  e);
      localStorage.removeItem('token');
      return false;
    }

  }

}