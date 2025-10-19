import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { IndexComponent } from './admin/index/index.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', component: LoginComponent},
    { path: 'registrar', component: RegisterComponent},
    { path: 'admin', component: IndexComponent, canActivate: [AuthGuard]}
];
