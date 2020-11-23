import { Statuses } from "./StatusTypes";

export type messageData = { sender: any, text: string, id: number } | null
export type chatData = { id: string, users: any[], messages: messageData[] } | null
