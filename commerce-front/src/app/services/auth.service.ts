import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl = '';

  constructor(private http: HttpClient) { }

  login(nombre: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, {nombre, password});
  }
}
