import { Statuses } from "./StatusTypes";

export type messageData = { senderId: string, message: string, sent: Date } | null
export type chatData = { chatId: string, users: any[], messages: messageData[] } | null

const data = [
    {
        chatId: '001',
        users: [
            {
                id: '1',
                email: 'evelin@gmail.com',
                displayName: "Evelin Szabados",
                status: Statuses.Offline
            },
            {
                id: '2',
                email: 'tamas@gmail.com',
                displayName: "Tamás Sallai",
                status: Statuses.Offline
            }
        ],
        messages: [
            {
                senderId: '2',
                message: "Hi! How are you?",
                sent: new Date(),

            },
            {
                senderId: '1',
                message: "I am fine! Thanks! :D ",
                sent: new Date(),

            }
        ]
    },
    {
        chatId: '002',
        users: [
            {
                id: '1',
                email: 'evelin@gmail.com',
                displayName: "Evelin Szabados",
                status: Statuses.Offline
            },
            {
                id: '3',
                email: 'eszter@gmail.com',
                displayName: "Eszter Lévai",
                status: Statuses.Offline
            }
        ],
        messages: [
            {
                senderId: '1',
                message: "Hi! Can you send me the title of that book we were talking baout last Sunday? :)",
                sent: new Date(),

            },
            {
                senderId: '3',
                message: "Sure! Just a moment.",
                sent: new Date(),

            }
        ]
    },




];

export const allChat = (userId: string | null): chatData[] => {
    let chatsToReturn: chatData[];
    chatsToReturn = [];
    if (userId !== null) {
        data.forEach(chat => {
            if (chat.users.filter(user => user.id === userId).length > 0) {

                chatsToReturn.push(chat)
            }

        })
    }

    return chatsToReturn;
}