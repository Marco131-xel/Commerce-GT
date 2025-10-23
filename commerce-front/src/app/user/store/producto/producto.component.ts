import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../layout/header/header.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { CommonModule } from '@angular/common';
import { MeProducto as Producto } from '../../models/producto.model';
import { ProductoService } from '../../../services/producto.service';
import { Router } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent implements OnInit {

  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  cargando = true;
  productoSeleccionado?: Producto;
  filtroActivo: string = 'todos';

  constructor(private productoService: ProductoService, private router: Router) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  // crear productos segun el usuario
  crearProductos() {
    this.router.navigate(['/crear-producto']);
  }

  // cargar los productos del usuario autenticado
  cargarProductos(): void {
    this.cargando = true;
    this.productoService.listarMisProductosDTO().subscribe({
      next: (data) => {
        this.productos = data;
        this.aplicarFiltro();
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar productos', err);
        this.cargando = false;
      }
    });
  }

  // filtrar los productos segun el estado
  filtrarProductos(filtro: string): void {
    this.filtroActivo = filtro;
    this.aplicarFiltro();
  }

  // aplica el filtro actual
  aplicarFiltro(): void {
    switch (this.filtroActivo) {
      case 'aprobados':
        this.productosFiltrados = this.productos.filter(p => p.estadoRevision === 'APROBADO');
        break;
      case 'pendientes':
        this.productosFiltrados = this.productos.filter(p => p.estadoRevision === 'PENDIENTE');
        break;
      case 'rechazados':
        this.productosFiltrados = this.productos.filter(p => p.estadoRevision === 'RECHAZADO');
        break;
      default:
        this.productosFiltrados = [...this.productos];
        break;
    }
  }

  // ver los detalles en el modal
  verDetalles(producto: Producto): void {
    this.productoSeleccionado = producto;
    const modalElement = document.getElementById('detalleModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  // editar un producto
  editar(): void {
    if (!this.productoSeleccionado) return;
    this.router.navigate(['/editar-producto', this.productoSeleccionado.idProducto]);
  }

  // eliminar producto
  eliminar(): void {
    if (!this.productoSeleccionado) return;

    const confirmar = confirm(`¿Seguro que deseas eliminar el producto "${this.productoSeleccionado.nombre}"?`);
    if (!confirmar) return;

    this.productoService.eliminarProducto(this.productoSeleccionado.idProducto).subscribe({
      next: () => {
        alert('Producto eliminado correctamente');
        this.cargarProductos();
        const modalElement = document.getElementById('detalleModal');
        if (modalElement) {
          const modalInstance = bootstrap.Modal.getInstance(modalElement);
          modalInstance?.hide();
        }
      },
      error: (err) => {
        console.error('Error al eliminar producto:', err);
        alert('No se pudo eliminar el producto');
      }
    });
  }
}
