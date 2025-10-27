export interface PedidoDetalle {
  producto: any;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

export interface Pedido {
  idPedido: number;
  usuario?: Usuario;
  fechaPedido: string;
  fechaEntregaEstimada: string;
  estado: string;
  total: number;
  detalles: PedidoDetalle[];
}

export interface Usuario {
  idUsuario: number;
  nombre: string;
  apellido: string;
  correo?: string;
}
