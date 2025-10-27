import { Component } from '@angular/core';
import { HeadsusComponent } from '../layout/headsus/headsus.component';
import { FooterComponent } from "../../user/layout/footer/footer.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-suspendido',
  standalone: true,
  imports: [HeadsusComponent, FooterComponent],
  templateUrl: './suspendido.component.html',
  styleUrl: './suspendido.component.css'
})
export class SuspendidoComponent {

  constructor(private router: Router) {}

  cerrar() {
    this.router.navigate(['/']);
  }
}
