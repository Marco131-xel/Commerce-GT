import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../layout/header/header.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { CommonModule } from '@angular/common';
import { ProductoPublico } from '../../models/producto.model';
import { ProductoService } from '../../../services/producto.service';
import { Router } from '@angular/router';

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

  constructor(private productoService: ProductoService, private router: Router) {}

  ngOnInit(): void {
    this.correoUsuario = localStorage.getItem('correo');

    this.productoService.listarPublicos().subscribe({
      next: (productos) => {
        if (this.correoUsuario) {
          this.productos = productos.filter(p => p.usuarioNombre?.correo !== this.correoUsuario);
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

}
