import { Injectable } from '@angular/core';
import { IMessage } from '../../interfaces/imessage.interface';
import { BehaviorSubject, from, of } from 'rxjs';
import { Database, ref, child, onChildAdded, push } from '@angular/fire/database';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messages: IMessage[] = []
  private messagesSubject = new BehaviorSubject<IMessage[]>([]);
  messages$ = this.messagesSubject.asObservable()

  constructor(private db: Database, private storageService: StorageService, private http: HttpClient) {
    const mensagensRef = ref(this.db, 'messages');

    onChildAdded(mensagensRef, (snapshot) => {
      console.log("NOVA MENSAGEM")
      const msg = snapshot.val() as IMessage;
      this.messages.push({...msg, isSender: msg.isOwn === this.storageService.getName()});
      this.messagesSubject.next([...this.messages]);
    });
   }

  sendMessage(newMessage: string) {
    if (!newMessage.trim()) return of()

    const message: IMessage = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "current",
      senderName: this.storageService.getName(),
      timestamp: Date.now(),
      isOwn: this.storageService.getKey(),
    }

    // this.http.post('http://localhost:8080/messages', message)

    const mensagensRef = ref(this.db, 'messages');

    return from(push(mensagensRef, message))
  }

  get messagesObservable() {
    return this.messagesSubject.asObservable()
  }
}
