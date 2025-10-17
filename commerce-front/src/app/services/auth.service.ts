import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) { }
  
  // funcion para registrar usuarios
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // funcion para loguear usuarios
  login(nombre: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, {nombre, password});
  }
}
