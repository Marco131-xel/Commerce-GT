import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../layout/header/header.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../../services/producto.service';
import { ProductoRequest, Categoria } from '../../models/producto.model';

@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule],
  templateUrl: './editar-producto.component.html',
  styleUrl: './editar-producto.component.css'
})
export class EditarProductoComponent implements OnInit {

  id!: number;
  producto: ProductoRequest = {
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    estadoProducto: 'NUEVO',
    categoria: { idCategoria: 0 },
    imagenUrl: ''
  };
  categorias: Categoria[] = [];
  cargando = true;

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarCategorias();
    this.cargarProducto();
  }

  cargarCategorias(): void {
    this.productoService.listarCategorias().subscribe({
      next: (data) => (this.categorias = data),
      error: (err) => console.error('Error al cargar categorías', err)
    });
  }

  cargarProducto(): void {
    this.productoService.listarMisProductosDTO().subscribe({
      next: (productos) => {
        const p = productos.find(prod => prod.idProducto === this.id);
        if (p) {
          this.producto = {
            nombre: p.nombre,
            descripcion: p.descripcion,
            precio: p.precio,
            stock: p.stock,
            estadoProducto: p.estadoProducto,
            categoria: { idCategoria: this.obtenerIdCategoriaPorNombre(p.categoriaNombre) },
            imagenUrl: p.imagenUrl
          };
        }
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar producto', err);
        this.cargando = false;
      }
    });
  }

  obtenerIdCategoriaPorNombre(nombre: string): number {
    const categoria = this.categorias.find(c => c.nombre === nombre);
    return categoria ? categoria.idCategoria : 0;
  }

  actualizarProducto(): void {
    if (!this.id) return;

    this.productoService.actualizarProducto(this.id, this.producto).subscribe({
      next: () => {
        alert('Producto actualizado correctamente');
        this.router.navigate(['/mi-producto']);
      },
      error: (err) => {
        console.error('Error al actualizar producto:', err);
        alert('No se pudo actualizar el producto');
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/mi-producto']);
  }

}
