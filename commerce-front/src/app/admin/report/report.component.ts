import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../layout/header/header.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { ReportesService } from '../../services/reportes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent implements OnInit {

  inicio = '2025-01-01';
  fin = '2025-12-31';

  productosMasVendidos: any[] = [];
  clientesMasGanancias: any[] = [];
  clientesMasVendidos: any[] = [];
  clientesMasPedidos: any[] = [];
  clientesMasProductos: any[] = [];

  constructor(private reportesService: ReportesService) {}

  ngOnInit() {
    this.cargarReportes();
  }

  cargarReportes() {
    this.reportesService.getTopProductosMasVendidos(this.inicio, this.fin)
      .subscribe(data => this.productosMasVendidos = data);

    this.reportesService.getTopClientesMasGanancias(this.inicio, this.fin)
      .subscribe(data => this.clientesMasGanancias = data);

    this.reportesService.getTopClientesMasProductosVendidos(this.inicio, this.fin)
      .subscribe(data => this.clientesMasVendidos = data);

    this.reportesService.getTopClientesMasPedidos(this.inicio, this.fin)
      .subscribe(data => this.clientesMasPedidos = data);

    this.reportesService.getTopClientesMasProductosEnVenta()
      .subscribe(data => this.clientesMasProductos = data);
  }
}
