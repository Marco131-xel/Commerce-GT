import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { IndexComponent as AdminIndexComponent } from './admin/index/index.component';
import { IndexComponent as UserIndexComponent } from './user/index/index.component';
import { PerfilComponent } from './user/perfil/perfil.component';
import { CardComponent } from './user/card/card.component';

export const routes: Routes = [
    { path: '', component: LoginComponent},
    { path: 'registrar', component: RegisterComponent},
    { path: 'admin', component: AdminIndexComponent, canActivate: [AuthGuard]},
    { path: 'user', component: UserIndexComponent, canActivate: [AuthGuard]},
    { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard]},
    { path: 'tarjeta', component: CardComponent, canActivate: [AuthGuard]}
];
