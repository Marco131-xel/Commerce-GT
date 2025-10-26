import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../layout/header/header.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { CommonModule } from '@angular/common';
import { ProductoPublico } from '../../models/producto.model';
import { ProductoService } from '../../../services/producto.service';
import { Router } from '@angular/router';
import { CarritoService } from '../../../services/carrito.service';

@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './tienda.component.html',
  styleUrl: './tienda.component.css'
})
export class TiendaComponent implements OnInit {

  productos: ProductoPublico[] = [];
  correoUsuario!: string | null;
  idUsuario?: number;

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    this.correoUsuario = localStorage.getItem('correo');
    const idUsuario = localStorage.getItem('id_usuario');
  
    if (idUsuario) {
      this.idUsuario = Number(idUsuario);
    }
  
    this.productoService.listarPublicos().subscribe({
      next: (productos) => {
        if (this.correoUsuario) {
          this.productos = productos.filter(
            p => p.usuarioNombre?.correo !== this.correoUsuario
          );
        } else {
          this.productos = productos;
        }
      },
      error: (err) => console.error('Error al cargar productos públicos:', err)
    });
  }

  verDetalles(idProducto: number): void {
    this.router.navigate(['/producto', idProducto]);
  }

  agregarAlCarrito(producto: ProductoPublico): void {
    if (!this.idUsuario) {
      alert('Debes iniciar sesión para agregar productos al carrito');
      return;
    }

    if (producto.stock <= 0) {
      alert('Este producto no tiene stock disponible');
      return;
    }

    this.carritoService.agregarProductoAlCarrito(this.idUsuario, producto.idProducto, 1)
      .subscribe({
        next: () => alert(`${producto.nombre} agregado al carrito`),
        error: (err) => {
          console.error('Error al agregar al carrito:', err);
          alert('Error al agregar al carrito');
        }
      });
  }
}
