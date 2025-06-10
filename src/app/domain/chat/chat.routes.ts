import { Routes } from '@angular/router';
import { ChatsPage } from './chats.page';

export const routes: Routes = [
  {
    path: 'chat',
    component: ChatsPage,
    children: [
      {
        path: '**',
        loadComponent: () =>
          import('./pages/chat/chat.page').then((m) => m.ChatPage),
      },
    ],
  },
  {
    path: '',
    redirectTo: '/chat/',
    pathMatch: 'full',
  },
];
