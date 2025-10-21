import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HeaderComponent } from '../layout/header/header.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { User } from '../models/user.model';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, CommonModule, FormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})

export class EditComponent implements OnInit {
  
  users: User[] = []; 

  user: User = {
    idUsuario: 0,
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    direccion: '',
    tipoUsuario: '',
    estado: '',
    fechaRegistro: '',
  };

  cargando = true;
  tiposUsuario = ['ADMINISTRADOR', 'LOGISTICA', 'MODERADOR'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      alert('ID de usuario no válido');
      this.router.navigate(['/empleados']);
      return;
    }

    // cargar los usuarios
    this.authService.getAllUsers().subscribe({
      next: (users) => {
        const encontrado = users.find(u => u.idUsuario === id);
        if (encontrado) {
          this.user = encontrado;
        } else {
          alert('Usuario no encontrado');
          this.router.navigate(['/empleados']);
        }
        this.cargando = false;
      },
      error: (err) => {
        console.error(err);
        alert('Error al cargar usuario');
        this.cargando = false;
      }
    });
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    this.authService.updateUser(this.user.idUsuario, this.user).subscribe({
      next: () => {
        alert('Usuario actualizado');
        this.router.navigate(['/empleados']);
      },
      error: (err) => {
        console.error(err);
        alert('Error al actualizar el usuario');
      },
    });
  }

  cancelar() {
    this.router.navigate(['/empleados']);
  }

}
