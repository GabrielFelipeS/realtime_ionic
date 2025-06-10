import { Injectable } from '@angular/core';
import { IMessage } from '../../interfaces/imessage.interface';
import { BehaviorSubject } from 'rxjs';
import { Database, ref, child, onChildAdded, push } from '@angular/fire/database';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messages: IMessage[] = []
  private messagesSubject = new BehaviorSubject<IMessage[]>([]);
  messages$ = this.messagesSubject.asObservable()

  constructor(private db: Database, private storageService: StorageService) {
    const mensagensRef = ref(this.db, 'messages');

    onChildAdded(mensagensRef, (snapshot) => {
      const msg = snapshot.val() as IMessage;
      this.messages.push({...msg, isSender: msg.isOwn === this.storageService.getName()});
      this.messagesSubject.next([...this.messages]);
      console.log("NOVA MENSAGEM")
    });
   }

  sendMessage(newMessage: string) {
    if (!newMessage.trim()) return Promise.reject()

    console.log(this.storageService.getName())

    const message: IMessage = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "current",
      senderName: this.storageService.getName(),
      timestamp: Date.now(),
      isOwn: this.storageService.getKey(),
    }

    const mensagensRef = ref(this.db, 'messages');

    return push(mensagensRef, message)
  }

  get messagesObservable() {
    return this.messagesSubject.asObservable()
  }
}
