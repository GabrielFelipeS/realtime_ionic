import { Component } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { ellipse, triangle } from 'ionicons/icons';

@Component({
  selector: 'app-chats',
  template: `
  <ion-tabs>
    <ion-tab-bar slot="bottom">
      <ion-tab-button tab="tab2" href="/chat/1">
        <ion-icon aria-hidden="true" name="ellipse"></ion-icon>
        <ion-label>Último grupo aberto</ion-label>
      </ion-tab-button>
    </ion-tab-bar>
  </ion-tabs>

  `,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel]
})
export class ChatsPage  {

  constructor() {
    addIcons({ triangle, ellipse });
  }

}
