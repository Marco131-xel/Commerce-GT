import { Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { IndexComponent as AdminIndexComponent } from './admin/index/index.component';
import { IndexComponent as UserIndexComponent } from './user/index/index.component';
import { PerfilComponent } from './user/perfil/perfil.component';
import { CardComponent } from './user/card/card.component';
import { EmpleadosComponent } from './admin/empleados/empleados.component';
import { UsuariosComponent } from './admin/usuarios/usuarios.component';
import { EditComponent } from './admin/edit/edit.component';
import { CrearProductoComponent } from './user/store/crear-producto/crear-producto.component';
import { InicioComponent as ModeradorComponent } from './moderador/inicio/inicio.component';
import { PerfilComponent as PerfilModeradorComp } from './moderador/perfil/perfil.component';
import { TablaComponent } from './moderador/solicitudes/tabla/tabla.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'registrar', component: RegisterComponent },

  /* ADMIN */
  { path: 'admin', component: AdminIndexComponent, canActivate: [AdminGuard] },
  { path: 'empleados', component: EmpleadosComponent, canActivate: [AdminGuard] },
  { path: 'crearUser', component: UsuariosComponent, canActivate: [AdminGuard] },
  { path: 'editarUser/:id', component: EditComponent, canActivate: [AdminGuard] },

  /* USER */
  { path: 'user', component: UserIndexComponent, canActivate: [UserGuard] },
  { path: 'perfil', component: PerfilComponent, canActivate: [UserGuard] },
  { path: 'tarjeta', component: CardComponent, canActivate: [UserGuard] },
  { path: 'crear-producto', component: CrearProductoComponent, canActivate: [UserGuard]},

  /* MODERADOR */
  { path: 'moderador', component: ModeradorComponent},
  { path: 'perfilMod', component: PerfilModeradorComp},
  { path: 'solicitudProducto', component: TablaComponent},

  { path: '**', redirectTo: '' }
];
