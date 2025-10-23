export interface Producto {
  id_producto?: number;
  id_usuario?: number;
  id_categoria: number;
  nombre: string;
  descripcion?: string;
  imagen_url?: string;
  precio: number;
  stock: number;
  estado_producto: 'NUEVO' | 'USADO';
  estado_revision?: 'PENDIENTE' | 'APROBADO' | 'RECHAZADO';
  fecha_publicacion?: string;
}

export interface Categoria {
  idCategoria: number;
  nombre: string;
}

export interface ProductoRequest {
  nombre: string;
  descripcion?: string;
  imagenUrl?: string;
  precio: number;
  stock: number;
  estadoProducto: 'NUEVO' | 'USADO';
  categoria: { idCategoria: number };
}

export interface MeProducto {
  idProducto: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  stock: number;
  imagenUrl: string;
  estadoProducto: 'NUEVO' | 'USADO';
  estadoRevision: 'PENDIENTE' | 'APROBADO' | 'RECHAZADO';
  fechaPublicacion: string;
  categoriaNombre: string;
  usuarioNombre: string;
}
