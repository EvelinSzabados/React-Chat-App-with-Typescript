export type messageData = { senderId: string, message: string, sent: Date } | null
export type chatData = { chatId: string, users: any[], messages: messageData[] } | null

const data = [
    {
        chatId: '001',
        users: [
            {
                id: '1',
                displayName: 'Evelin Szabados'
            },
            {
                id: '2',
                displayName: 'Tamás Sallai'
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
                displayName: 'Evelin Szabados'
            },
            {
                id: '3',
                displayName: 'Eszter Lévai'
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