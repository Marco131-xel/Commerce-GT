import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../layout/header/header.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../../services/pedido.service';
import { Pedido } from '../../user/models/pedido.model';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent implements OnInit{
  
  pedidos: Pedido[] = [];
  pedidoSeleccionado: Pedido | null = null;
  cargando = true;

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.obtenerPedidos();
  }

  obtenerPedidos(): void {
    this.pedidoService.obtenerTodos().subscribe({
      next: (data) => {
        this.pedidos = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al obtener pedidos:', err);
        this.cargando = false;
      }
    });
  }

  verDetalles(pedido: Pedido): void {
    this.pedidoSeleccionado = pedido;
  
    const modal = document.getElementById('detalleModal');
    if (modal) {
      const modalBootstrap = new (window as any).bootstrap.Modal(modal);
      modalBootstrap.show();
    }
  }


  marcarEntregado(pedidoId: number): void {
    if (confirm('¿Marcar este pedido como entregado?')) {
      this.pedidoService.marcarEntregado(pedidoId).subscribe({
        next: () => {
          const pedido = this.pedidos.find(p => p.idPedido === pedidoId);
          if (pedido) pedido.estado = 'ENTREGADO';
        },
        error: (err) => console.error('Error al marcar entregado:', err)
      });
    }
  }

}
