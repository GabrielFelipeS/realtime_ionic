export interface IMessage {
  id: string
  text: string
  sender: string
  senderName: string
  timestamp: number
  isOwn: string
  isSender?: boolean
  status?: "sent" | "delivered" | "read"
}