import { Routes } from '@angular/router';
import { ChatsPage } from './chats.page';

export const routes: Routes = [
  {
    path: 'chat',
    component: ChatsPage,
    children: [
      {
        path: '1',
        loadComponent: () =>
          import('./pages/chat/chat.page').then((m) => m.ChatPage),
      },
    ],
  },
];
