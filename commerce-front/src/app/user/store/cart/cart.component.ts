import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../layout/header/header.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { CarritoService } from '../../../services/carrito.service';
import { ProductoPublico } from '../../models/producto.model';
import { ProductoService } from '../../../services/producto.service';
import { AuthService } from '../../../services/auth.service';
import { PedidoService } from '../../../services/pedido.service';
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
    private productoService: ProductoService,
    private authService: AuthService,
    private pedidoService: PedidoService
  ) {}

  ngOnInit(): void {
    const idUsuario = localStorage.getItem('id_usuario');
    if (idUsuario) {
      this.idUsuario = Number(idUsuario);
      this.cargarCarritos();
    }
  }

  cargarCarritos(): void {
    this.carritoService.listarCarritosPorUsuario(this.idUsuario).subscribe({
      next: (data) => {
        this.carritos = (data || [])
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

  eliminar(carrito: any): void {
    if (confirm('¿Deseas eliminar este carrito?')) {
      this.carritoService.eliminarCarrito(carrito.idCarrito).subscribe({
        next: () => {
          alert('Carrito eliminado');
          this.cargarCarritos();
        },
        error: (err) => {
          console.error('Error al eliminar carrito:', err);
          alert('No se pudo eliminar el carrito');
        }
      });
    }
  }

  comprar(): void {
    this.router.navigate(['/tienda']);
  }

  procederPago(carrito: any): void {
    if (!this.idUsuario) {
      console.log("NO HAY USUARIO");
      return;
    }

    this.authService.getTarjetas().subscribe({
      next: (tarjetas) => {
        if (!tarjetas || tarjetas.length === 0) {
          alert('No tienes tarjeta registrada');
          this.router.navigate(['/perfil']);
          return;
        }

        if (confirm('¿Deseas confirmar el pago de este carrito?')) {
          this.pedidoService.crearDesdeCarrito(this.idUsuario).subscribe({
            next: (pedido) => {
              alert('Pedido realizado');
              this.cargarCarritos();
            },
            error: (err) => {
              alert('Error al crear el pedido: ' + err.error);
              console.error(err);
            }
          });
        }
      },
      error: (err) => {
        console.error('Error al verificar tarjeta: ', err);
        alert('Error al verificar tarjeta');
      }
    });
  }

}
