import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Carrito } from "../user/models/carrito.model";
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CarritoService {

  private baseUrl = environment.apiBaseUrl;

  private carroUrl = `${this.baseUrl}/carritos`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
  const token = localStorage.getItem('token');
  return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
  });
  }

  agregarProductoAlCarrito(idUsuario: number, idProducto: number, cantidad: number = 1): Observable<any> {
  return this.http.post(
      `${this.carroUrl}/agregar?idUsuario=${idUsuario}&idProducto=${idProducto}&cantidad=${cantidad}`,
      {},
      { headers: this.getAuthHeaders(), responseType: 'text' }
  );
  }

  listarCarritoActivo(idUsuario: number): Observable<any> {
    return this.http.get(`${this.carroUrl}/usuario/${idUsuario}/activo`, {
      headers: this.getAuthHeaders()
    });
  }

  obtenerCarritoActivo(idUsuario: number): Observable<Carrito | string> {
    return this.http.get<Carrito | string>(`${this.carroUrl}/usuario/${idUsuario}/activo`, {
      headers: this.getAuthHeaders()
    });
  }
    
  listarCarritosPorUsuario(idUsuario: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.carroUrl}/usuario/${idUsuario}`, {
      headers: this.getAuthHeaders()
    });
  }

  eliminarCarrito(idCarrito: number): Observable<void> {
    return this.http.delete<void>(`${this.carroUrl}/${idCarrito}`, {
      headers: this.getAuthHeaders()
    });
  }
    
}