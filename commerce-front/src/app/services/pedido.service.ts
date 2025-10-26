import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = 'http://localhost:8080/pedidos';

  constructor(private http: HttpClient) {}

  crearDesdeCarrito(idUsuario: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/crear-desde-carrito/${idUsuario}`, {});
  }

  listarPorUsuario(idUsuario: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuario/${idUsuario}`);
  }
}
