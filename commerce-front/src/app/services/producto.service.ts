import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto, Categoria, ProductoRequest } from '../user/models/producto.model';
import { ProductoModerador } from '../moderador/models/producto.model';
import { MeProducto, ProductoPublico } from '../user/models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

    private apiUrl = 'http://localhost:8080/productos';
    private categoriaUrl = 'http://localhost:8080/categorias';
    
    constructor(private http: HttpClient) {}
    
    private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    });
    }
    
    // listar productos del usuario autenticado
    listarMisProductos(): Observable<MeProducto[]> {
    return this.http.get<MeProducto[]>(this.apiUrl, { headers: this.getAuthHeaders() });
    }
  
    // listar productos del usuario (todos)
    listarMisProductosDTO(): Observable<MeProducto[]> {
      return this.http.get<MeProducto[]>(`${this.apiUrl}/mis-productos`, { headers: this.getAuthHeaders() });
    }
  
    // listar productos del usuario por estado (PENDIENTE, APROBADO, RECHAZADO)
    listarMisProductosPorEstado(estado: 'PENDIENTE' | 'APROBADO' | 'RECHAZADO'): Observable<MeProducto[]> {
      return this.http.get<MeProducto[]>(`${this.apiUrl}/mis-productos/${estado}`, { headers: this.getAuthHeaders() });
    }
  
    // crear producto
    crearProducto(producto: ProductoRequest): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto, { headers: this.getAuthHeaders() });
    }
    
    // actualizar producto
    actualizarProducto(id: number, producto: ProductoRequest): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${id}`, producto, { headers: this.getAuthHeaders() });
    }
    
    // eliminar producto
    eliminarProducto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
    }
    
    // listar todos los productos aprobados
    listarPublicos(): Observable<ProductoPublico[]> {
    return this.http.get<ProductoPublico[]>(`${this.apiUrl}/publicos`);
    }
    
    // listar categorías
    listarCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.categoriaUrl);
    }

    // listar productos pendientes (moderador)
    listarPendientes(): Observable<ProductoModerador[]> {
      return this.http.get<ProductoModerador[]>(`${this.apiUrl}/pendientes`, { headers: this.getAuthHeaders() });
    }

    actualizarEstado(idProducto: number, estado: 'APROBADO' | 'RECHAZADO'): Observable<any> {
      return this.http.put(`${this.apiUrl}/${idProducto}/estado`, { estadoRevision: estado }, { headers: this.getAuthHeaders() });
    }
    
}
