import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./domain/chat/chat.routes').then((m) => m.routes),
  },
];
