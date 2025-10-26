import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../user/models/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = 'http://localhost:8080/pedidos';

  constructor(private http: HttpClient) {}

  crearDesdeCarrito(idUsuario: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/crear-desde-carrito/${idUsuario}`, {});
  }

  listarPorUsuario(idUsuario: number): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}/usuario/${idUsuario}`);
  }

}
