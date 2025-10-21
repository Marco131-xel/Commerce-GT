export interface Tarjeta {
  id?: number;
  idTarjeta?: number;
  numeroTarjeta: string;
  nombreTitular: string;
  fechaExpiracion: string;
  cvv: string;
  tarjetaPrincipal: boolean;
}
