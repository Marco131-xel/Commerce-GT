import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../user/layout/header/header.component";
import { FooterComponent } from "../../user/layout/footer/footer.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Tarjeta } from '../models/tarjeta.model';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, CommonModule, FormsModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit{

  tarjetas: Tarjeta[] = [];
  numero_tarjeta: string = '';
  nombre_titular: string = '';
  fecha_expiracion: string = '';
  cvv: string = '';
  tarjeta_principal: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.cargarTarjetas();
  }

  cargarTarjetas() {
    this.authService.getTarjetas().subscribe({
      next: (data) => {
        this.tarjetas = data;
      },
      error: (err) => {
        console.error('Error al cargar tarjetas', err);
      }
    });
  }

  // crear nueva tarjeta
  agregarTarjeta() {
    if (this.numero_tarjeta.replace(/\s/g, '').length < 16) {
      alert('Por favor, ingresa un número de tarjeta válido (16 dígitos)');
      return;
    }
    if (this.nombre_titular.length < 3) {
      alert('Por favor, ingresa el nombre del titular');
      return;
    }
    if (this.fecha_expiracion.length !== 5) {
      alert('Por favor, ingresa una fecha de expiración válida (MM/AA)');
      return;
    }
    if (this.cvv.length < 3) {
      alert('Por favor, ingresa un CVV válido (3-4 dígitos)');
      return;
    }

    const nuevaTarjeta: Tarjeta = {
      numeroTarjeta: this.numero_tarjeta.replace(/\s/g, ''),
      nombreTitular: this.nombre_titular,
      fechaExpiracion: this.fecha_expiracion,
      cvv: this.cvv,
      tarjetaPrincipal: this.tarjeta_principal
    };

    this.authService.crearTarjeta(nuevaTarjeta).subscribe({
      next: (tarjeta) => {
        this.tarjetas.push(tarjeta);
        alert('Tarjeta agregada correctamente');
        this.resetForm();
      },
      error: (err) => {
        console.error('Error al agregar tarjeta', err);
        alert('Hubo un error al guardar la tarjeta.');
      }
    });
  }

  // eliminar tarjeta
  eliminarTarjeta(index: number) {
    const tarjeta = this.tarjetas[index];
    if (!tarjeta.idTarjeta) return;
  
    if (confirm('¿Deseas eliminar esta tarjeta?')) {
      this.authService.eliminarTarjeta(tarjeta.idTarjeta).subscribe({
        next: () => {
          this.tarjetas.splice(index, 1);
          alert('Tarjeta eliminada correctamente');
        },
        error: (err) => {
          console.error('Error al eliminar tarjeta', err);
          alert('No se pudo eliminar la tarjeta');
        }
      });
    }
  }

  // limpiar formulario
  resetForm() {
    this.numero_tarjeta = '';
    this.nombre_titular = '';
    this.fecha_expiracion = '';
    this.cvv = '';
    this.tarjeta_principal = false;
  }

  // formatear campos
  formatNumeroTarjeta(event: any) {
    let value = event.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    event.target.value = formattedValue;
    this.numero_tarjeta = formattedValue;
  }

  formatFechaExpiracion(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    event.target.value = value;
    this.fecha_expiracion = value;
  }

  formatCVV(event: any) {
    event.target.value = event.target.value.replace(/\D/g, '');
    this.cvv = event.target.value;
  }

}
