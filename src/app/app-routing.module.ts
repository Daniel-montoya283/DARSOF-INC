import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RecuperarPasswordComponent } from './components/recuperar-password/recuperar-password.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { VerificarCorreoComponent } from './components/verificar-correo/verificar-correo.component';
import { TGSComponent } from './components/tgs/tgs.component';
import { PerfilesComponent } from './components/perfiles/perfiles.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'registrar-usuario', component: RegistrarUsuarioComponent },
    { path: 'verificar-correo', component: VerificarCorreoComponent },
    { path: 'recuperar-password', component: RecuperarPasswordComponent },
    { path: 'dashboard', component: DashboardComponent },
    {path: 'home', component: HomeComponent},
    {path: 'tsg', component: TGSComponent},
    {path: 'perfiles', component: PerfilesComponent},
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
