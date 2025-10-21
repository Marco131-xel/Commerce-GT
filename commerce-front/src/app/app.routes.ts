import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { IndexComponent as AdminIndexComponent } from './admin/index/index.component';
import { IndexComponent as UserIndexComponent } from './user/index/index.component';
import { PerfilComponent } from './user/perfil/perfil.component';
import { CardComponent } from './user/card/card.component';
import { EmpleadosComponent } from './admin/empleados/empleados.component';
import { UsuariosComponent } from './admin/usuarios/usuarios.component';
import { EditComponent } from './admin/edit/edit.component';

export const routes: Routes = [
    { path: '', component: LoginComponent},
    { path: 'registrar', component: RegisterComponent},
    { path: 'admin', component: AdminIndexComponent, canActivate: [AuthGuard]},
    { path: 'user', component: UserIndexComponent, canActivate: [AuthGuard]},
    { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard]},
    { path: 'tarjeta', component: CardComponent, canActivate: [AuthGuard]},
    { path: 'empleados', component: EmpleadosComponent, canActivate: [AuthGuard]},
    { path: 'crearUser', component: UsuariosComponent, canActivate: [AuthGuard]},
    { path: 'editarUser/:id', component: EditComponent, canActivate: [AuthGuard]}
];
