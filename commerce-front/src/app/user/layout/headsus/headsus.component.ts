import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-headsus',
  standalone: true,
  imports: [],
  templateUrl: './headsus.component.html',
  styleUrl: './headsus.component.css'
})
export class HeadsusComponent {

  nombreUsuario: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  // mostar el nombre del usuario
  ngOnInit(): void {
    this.nombreUsuario = localStorage.getItem('nombre');
  }
}
