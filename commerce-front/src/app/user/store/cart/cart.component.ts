import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../layout/header/header.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { CarritoService } from '../../../services/carrito.service';
import { ProductoPublico } from '../../models/producto.model';
import { ProductoService } from '../../../services/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  carritos: any[] = [];
  idUsuario!: number;
  producto?: ProductoPublico;

  constructor(
    private carritoService: CarritoService,
    private router: Router,
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    const idUsuario = localStorage.getItem('id_usuario');
    if (idUsuario) {
      this.idUsuario = Number(idUsuario);
      this.cargarCarritos();
    }
  }

  cargarCarritos(): void {
    this.carritoService.listarCarritoActivo(this.idUsuario).subscribe({
      next: (data) => {
        const carritosArray = Array.isArray(data)
          ? data
          : data
          ? [data]
          : [];

        this.carritos = carritosArray
          .filter((c: any) => c != null)
          .map((c: any) => ({
            ...c,
            detalles: Array.isArray(c.detalles)
              ? c.detalles.filter((d: any) => d?.producto)
              : []
          }));
      },
      error: (err) => console.error('Error al cargar carritos:', err)
    });
  }

  calcularTotal(carrito: any): number {
    if (!carrito?.detalles) return 0;
    return carrito.detalles.reduce(
      (sum: number, item: any) =>
        sum + (item?.cantidad || 0) * (item?.producto?.precio || 0),
      0
    );
  }

  comprar(): void {
    this.router.navigate(['/tienda']);
  }

  procederPago(carrito: any): void {
    this.router.navigate(['/checkout', carrito.id]);
  }

}
