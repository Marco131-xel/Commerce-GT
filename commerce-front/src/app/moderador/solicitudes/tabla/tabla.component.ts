import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../layout/header/header.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProductoModerador as Producto } from '../../models/producto.model';
import { ProductoService } from '../../../services/producto.service';

declare var bootstrap: any;

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, HttpClientModule],
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.css'
})

export class TablaComponent implements OnInit {

  productos: Producto[] = [];
  cargando = true;
  productoSeleccionado?: Producto;

  constructor(private productoService: ProductoService, private router: Router) {}

  ngOnInit(): void {
    this.cargarProductos();
  }
  
  // funcion para mostrar los productos en la tabla
  cargarProductos() {
    this.productoService.listarPendientes().subscribe({
      next: (data) => {
        this.productos = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
        this.cargando = false;
      }
    });
  }
  
  // funcion para ver los detalles del producto
  verDetalles(producto: Producto): void {
    this.productoSeleccionado = producto;
    const modal = document.getElementById('detalleModal');
    if (modal) {
      const modalInstance = new bootstrap.Modal(modal);
      modalInstance.show();
    }
  }
  
  // funcion aprobar un producto
  aprobar(producto: Producto) {
    producto.estadoRevision = 'APROBADO';
    this.productoService.actualizarEstado(producto.idProducto!, 'APROBADO').subscribe({
      next: () => this.cargarProductos(),
      error: (err) => console.error('Error al aprobar producto:', err)
    });
  }
  
  // funcion rechazar un producto
  rechazar(producto: Producto) {
    producto.estadoRevision = 'RECHAZADO';
    this.productoService.actualizarEstado(producto.idProducto!, 'RECHAZADO').subscribe({
      next: () => this.cargarProductos(),
      error: (err) => console.error('Error al rechazar producto:', err)
    });
  }

}
