import { Routes } from '@angular/router';
import { Usuarios } from './pages/usuarios/usuarios';
import { Endereco } from './pages/endereco/endereco';

export const routes: Routes = [
  { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
  { path: 'usuarios', component: Usuarios },
  { path: 'endereco', component: Endereco },
];