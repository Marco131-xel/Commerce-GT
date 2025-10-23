import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../layout/header/header.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductoService } from '../../../services/producto.service';
import { Producto, Categoria, ProductoRequest } from '../../models/producto.model';

@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, CommonModule, FormsModule],
  templateUrl: './crear-producto.component.html',
  styleUrl: './crear-producto.component.css'
})

export class CrearProductoComponent implements OnInit {

  categorias: Categoria[] = [];

  producto: any = {
    id_categoria: 0,
    nombre: '',
    descripcion: '',
    imagen_url: '',
    precio: 0,
    stock: 1,
    estado_producto: 'NUEVO'
  };

  mensajeError: string | null = null;
  mensajeExito: string | null = null;

  constructor(private productoService: ProductoService, private router: Router) {}

  ngOnInit(): void {
    this.productoService.listarCategorias().subscribe({
      next: (data) => this.categorias = data,
      error: (err) => console.error('Error cargando categorias', err)
    });
  }

  crearProducto() {
    this.mensajeError = null;
    this.mensajeExito = null;

    const productoAEnviar: ProductoRequest = {
      nombre: this.producto.nombre,
      descripcion: this.producto.descripcion,
      imagenUrl: this.producto.imagen_url,
      precio: this.producto.precio,
      stock: this.producto.stock,
      estadoProducto: this.producto.estado_producto,
      categoria: { idCategoria: Number(this.producto.id_categoria) }
    };
  
    this.productoService.crearProducto(productoAEnviar).subscribe({
      next: () => {
        this.mensajeExito = 'Producto agregado exitosamente';
        this.producto = {
          id_categoria: 0,
          nombre: '',
          descripcion: '',
          imagen_url: '',
          precio: 0,
          stock: 1,
          estado_producto: 'NUEVO'
        };
      },
      error: (err) => {
        console.error('Error al crear producto:', err);
        this.mensajeError = 'No se pudo crear el producto';
      }
    });
  }
  
  regresar() {
    this.router.navigate(['/mi-producto']);
  }
}
