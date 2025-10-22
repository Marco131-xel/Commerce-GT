import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto, Categoria, ProductoRequest } from '../user/models/producto.model';

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
    listarMisProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl, { headers: this.getAuthHeaders() });
    }
    
    // crear producto
    crearProducto(producto: ProductoRequest): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto, { headers: this.getAuthHeaders() });
    }
    
    // actualizar producto
    actualizarProducto(id: number, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${id}`, producto, { headers: this.getAuthHeaders() });
    }
    
    // eliminar producto
    eliminarProducto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
    }
    
    // listar todos los productos aprobados
    listarPublicos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/publicos`);
    }
    
    // listar categorías
    listarCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.categoriaUrl);
    }
}
