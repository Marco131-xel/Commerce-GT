import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../layout/header/header.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { PedidoService } from '../../services/pedido.service';
import { Pedido } from '../models/pedido.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './pedido.component.html',
  styleUrl: './pedido.component.css'
})
export class PedidoComponent implements OnInit {
  
  pedidos: Pedido[] = [];
  idUsuario!: number;
  cargando = true;

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    const idUsuario = localStorage.getItem('id_usuario');

    if (idUsuario) {
      this.idUsuario = Number(idUsuario);
      this.cargarPedidos();
    }
  }

  cargarPedidos(): void {
    this.pedidoService.listarPorUsuario(this.idUsuario).subscribe({
      next: (data) => {
        this.pedidos = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Erroa la cargar pedidos', err);
        this.cargando = false;
      }
    });
  }

}
