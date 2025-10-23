export interface ProductoModerador {
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
