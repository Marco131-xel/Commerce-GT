export interface Carrito {
  idCarrito: number;
  estado: string;
  fechaCreacion: string;
  usuario: {
    idUsuario: number;
    nombre?: string;
  };
  detalles: {
    idDetalle: number;
    cantidad: number;
    producto: {
      idProducto: number;
      nombre: string;
      precio: number;
      imagenUrl?: string;
    };
  }[];
}
