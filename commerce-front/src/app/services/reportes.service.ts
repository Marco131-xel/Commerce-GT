import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  private apiUrl = 'http://localhost:8080/reportes';

  constructor(private http: HttpClient) {}

  getTopProductosMasVendidos(inicio: string, fin: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/productos-mas-vendidos?inicio=${inicio}&fin=${fin}`);
  }

  getTopClientesMasGanancias(inicio: string, fin: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/clientes-mas-ganancias?inicio=${inicio}&fin=${fin}`);
  }

  getTopClientesMasProductosVendidos(inicio: string, fin: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/clientes-mas-vendidos?inicio=${inicio}&fin=${fin}`);
  }

  getTopClientesMasPedidos(inicio: string, fin: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/clientes-mas-pedidos?inicio=${inicio}&fin=${fin}`);
  }

  getTopClientesMasProductosEnVenta(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/clientes-mas-productos`);
  }

  getHistorialSanciones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/historial-sanciones`);
  }

}
