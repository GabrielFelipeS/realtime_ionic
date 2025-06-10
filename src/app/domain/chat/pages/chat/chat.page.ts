import { CommonModule } from "@angular/common"
import { Component, ViewChild, type ElementRef, type AfterViewInit, Signal } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { IonContent, ScrollDetail } from "@ionic/angular"
import { IonicModule } from "@ionic/angular"
import {IGroupMember} from '../../interfaces/igroup-member.interface';
import {IMessage} from '../../interfaces/imessage.interface';
import { DateUtils } from "src/app/widget/utils/date.utils"
import { MessageService } from "../../services/message/message.service"
import { AuthService } from "src/app/core/services/auth/auth.service"
import { StorageService } from "src/app/core/services/storage/storage.service"
import { Observable } from "rxjs"

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  imports: [CommonModule, FormsModule, IonicModule],
})
export class ChatPage implements  AfterViewInit{
  @ViewChild(IonContent, { static: false }) content!: IonContent
  @ViewChild("messageInput", { static: false }) messageInput!: ElementRef

  groupName = "Ionic é melhor que React"

  groupMembers: IGroupMember[] = [
    { id: "1", name: "João Silva", avatar: "/placeholder.svg?height=40&width=40", isOnline: true },
    { id: "2", name: "Maria Santos", avatar: "/placeholder.svg?height=40&width=40", isOnline: true },
    { id: "3", name: "Pedro Costa", avatar: "/placeholder.svg?height=40&width=40", isOnline: false },
    { id: "4", name: "Ana Oliveira", avatar: "/placeholder.svg?height=40&width=40", isOnline: true },
  ]

  messages: IMessage[] = []

  newMessage = ""
  newUser = ""
  isTyping = false
  usuarios: any;
  loggedUser!: Signal<string>;
  hasKey: Observable<boolean>

  constructor(private storageService: StorageService, private messageService: MessageService) {
    this.messageService.messages$.subscribe(messages => {
      this.messages = messages
       this.onScroll()
    })

    this.loggedUser = this.storageService.getKey;

    this.hasKey = this.storageService.getHasKey$();
  }

  ngAfterViewInit() {
    this.scrollToBottom()
  }

  sendMessage() {

    if (this.newMessage.trim()) {
      this.messageService.sendMessage(this.newMessage)
        .then( () => this.newMessage = "")

      this.scrollToBottom()
    }
  }

  async createUser() {
    await this.storageService.createUser(this.newUser)
    this.newUser = ''
  }

  onInputFocus() {
    setTimeout(() => {
      this.scrollToBottom()
    }, 300)
  }

  scrollToBottom() {
    setTimeout(() => {
      this.content.scrollToBottom(300)
    }, 100)
  }

  async onScroll() {
    if(!this.content) return

    const distanciaDoFim = 200;
    const scrollElement = await this.content.getScrollElement();

    const scrollTop = scrollElement.scrollTop;
    const scrollHeight = scrollElement.scrollHeight;
    const clientHeight = scrollElement.clientHeight;

    const scrollToBottom = (scrollTop + clientHeight) >= (scrollHeight - distanciaDoFim);

    if (scrollToBottom) {
      this.content.scrollToBottom(300);
    }
  }

  formatTime(timestamp: number): string {
   return DateUtils.formatTime(timestamp)
  }

  formatDate(timestamp: number): string {
    return DateUtils.formatDate(timestamp)
  }

  shouldShowDateSeparator(index: number): boolean {
    if (index === 0) return true

    const currentDate = new Date(this.messages[index].timestamp).toDateString()
    const previousDate = new Date(this.messages[index - 1].timestamp).toDateString()

    return currentDate !== previousDate
  }

  getOnlineMembersCount(): number {
    return this.groupMembers.filter((member) => member.isOnline).length
  }

  openGroupInfo() {
    // Implementar abertura de informações do grupo
    console.log("Abrir informações do grupo")
  }

  attachFile() {
    // Implementar anexo de arquivo
    console.log("Anexar arquivo")
  }

  openCamera() {
    // Implementar câmera
    console.log("Abrir câmera")
  }

}
