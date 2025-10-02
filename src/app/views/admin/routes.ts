import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Admin'
    },
    children: [
      {
        path: 'usuarios',
        loadComponent: () => import('./usuarios/usuarios.component').then(m => m.UsuariosComponent),
        data: {
          title: 'Usuarios'
        }
      }
    ]
  }
];