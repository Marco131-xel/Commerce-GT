import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../layout/header/header.component';
import { FooterComponent } from '../layout/footer/footer.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {

  nombreUsuario: string | null = null;
  
  // mostrar el nombre del usuario
  ngOnInit(): void {
    this.nombreUsuario = localStorage.getItem('nombre');
  }

}
