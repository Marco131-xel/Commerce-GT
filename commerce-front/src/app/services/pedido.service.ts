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
  
  // crear pedido por el usuario
  crearDesdeCarrito(idUsuario: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/crear-desde-carrito/${idUsuario}`, {});
  }
  
  // listar los pedidos por el usuario
  listarPorUsuario(idUsuario: number): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}/usuario/${idUsuario}`);
  }

  // obtener todos los pedidos para Logistica
  obtenerTodos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}/todos`);
  }

  // marcar como entregado para logistica
  marcarEntregado(idPedido: number): Observable<Pedido> {
    return this.http.put<Pedido>(`${this.apiUrl}/${idPedido}/entregado`, {});
  }
}
