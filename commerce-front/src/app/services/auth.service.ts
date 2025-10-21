import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

export interface JwtPayload {
  sub: string;
  role: string;
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl = 'http://localhost:8080/auth';
  private userUrl = 'http://localhost:8080/user';

  constructor(private http: HttpClient) { }
  
  // funcion para registrar usuarios
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // funcion para loguear usuarios
  login(correo: string, contrasena: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { correo, contrasena });
  }
  
  // funcion para reconocer el tipo de rol par el usuario
  getUserRole(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.role;
  }

  // funcion para cerrar sesion
  logout() {
    localStorage.removeItem('token');
  }

  /* FUNCIONES PARA EL USUARIO COMUN */
  // obtener el perfil del usuario
  getProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get(`${this.userUrl}/me`, { headers });
  }

  // actualizar perfil
  updateProfile(updatedUser: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.put(`${this.userUrl}/update`, updatedUser, { headers });
  }

  // eliminar cuenta
  deleteAccount(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.delete(`${this.userUrl}/delete`, { headers });
  }
}
