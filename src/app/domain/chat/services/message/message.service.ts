import { Injectable } from '@angular/core';
import { IMessage } from '../../interfaces/imessage.interface';
import { BehaviorSubject } from 'rxjs';
import { Database, ref, child, onChildAdded, push } from '@angular/fire/database';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messages: IMessage[] = []
  private messagesSubject = new BehaviorSubject<IMessage[]>([]);
  messages$ = this.messagesSubject.asObservable()

  constructor(private db: Database, private authService: AuthService) {
    const mensagensRef = ref(this.db, 'messages');

    onChildAdded(mensagensRef, (snapshot) => {
      const msg = snapshot.val() as IMessage;
      this.messages.push({...msg, isSender: msg.isOwn === this.authService.loggedNameUser()});
      this.messagesSubject.next([...this.messages]);
      console.log("NOVA MENSAGEM")
    });
   }

  sendMessage(newMessage: string) {
    console.log(this.authService.loggedUser())
    console.log(this.authService.loggedNameUser())

    const message: IMessage = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "current",
      senderName: this.authService.loggedNameUser(),
      timestamp: Date.now(),
      isOwn: this.authService.loggedUser(),
    }

    const mensagensRef = ref(this.db, 'messages');

    return push(mensagensRef, message)
  }

  get messagesObservable() {
    return this.messagesSubject.asObservable()
  }
}
