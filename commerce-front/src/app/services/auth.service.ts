import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { HttpHeaders } from '@angular/common/http';

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
  private cardUrl = 'http://localhost:8080/tarjeta';

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
  
  /* TARJETA DE CREDITO */
  
  // obtener todas las tarjetas del usuario autenticado
  getTarjetas(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.cardUrl}`, { headers });
  }

  // crear una nueva tarjeta
  crearTarjeta(tarjetaData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.cardUrl}`, tarjetaData, { headers });
  }

  // actualizar una tarjeta existente
  actualizarTarjeta(id: number, tarjetaData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.put(`${this.cardUrl}/${id}`, tarjetaData, { headers });
  }
  
  // eliminar una tarjeta
  eliminarTarjeta(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`${this.cardUrl}/${id}`, { headers });
  }

}
