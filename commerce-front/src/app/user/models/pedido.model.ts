export interface PedidoDetalle {
  producto: any;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

export interface Pedido {
  idPedido: number;
  fechaPedido: string;
  fechaEntregaEstimada: string;
  estado: string;
  total: number;
  detalles: PedidoDetalle[];
}