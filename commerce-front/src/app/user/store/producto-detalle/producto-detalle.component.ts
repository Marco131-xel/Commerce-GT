import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../layout/header/header.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { ProductoPublico } from '../../models/producto.model';
import { ProductoService } from '../../../services/producto.service';

@Component({
  selector: 'app-producto-detalle',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './producto-detalle.component.html',
  styleUrl: './producto-detalle.component.css'
})
export class ProductoDetalleComponent implements OnInit {
  producto?: ProductoPublico;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService
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
  }

  regresar(): void {
    this.router.navigate(['/tienda']);
  }
}
