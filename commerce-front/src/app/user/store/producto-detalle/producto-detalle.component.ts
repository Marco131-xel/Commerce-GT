import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../layout/header/header.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { ProductoPublico } from '../../models/producto.model';
import { ProductoService } from '../../../services/producto.service';
import { CarritoService } from '../../../services/carrito.service';

@Component({
  selector: 'app-producto-detalle',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule],
  templateUrl: './producto-detalle.component.html',
  styleUrl: './producto-detalle.component.css'
})
export class ProductoDetalleComponent implements OnInit {
  producto?: ProductoPublico;
  idUsuario?: number;
  cantidad: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService,
    private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.productoService.listarPublicos().subscribe({
        next: (productos) => {
          this.producto = productos.find(p => p.idProducto === id);
        },
        error: (err) => console.error('Error cargando producto:', err),
      });
    }

    const idUsuario = localStorage.getItem('id_usuario');
    if (idUsuario) {
      this.idUsuario = Number(idUsuario);
    }
  }

  agregarAlCarrito(): void {
    if (!this.producto || !this.idUsuario) return;

    if (this.cantidad < 1) {
      alert('La cantidad mínima es 1');
      return;
    }
    if (this.cantidad > this.producto.stock) {
      alert(`No puedes agregar más de ${this.producto.stock} unidades`);
      return;
    }

    this.carritoService
      .agregarProductoAlCarrito(this.idUsuario, this.producto.idProducto, this.cantidad)
      .subscribe({
        next: () => alert('Producto agregado al carrito'),
        error: (err) => alert('Error al agregar al carrito: ' + err.error)
      });
  }

  regresar(): void {
    this.router.navigate(['/tienda']);
  }
}
