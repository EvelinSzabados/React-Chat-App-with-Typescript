export type messageData = { sender: any, text: string, id?: number | string, chat?: chatData } | null
export type chatData = { id: string, users: any[], messages: messageData[], lastUpdated: string } | null
