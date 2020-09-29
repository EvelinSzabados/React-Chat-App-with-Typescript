type messageData = { senderId: string, message: string, sent: Date } | null
type chatData = { chatId: string, users: string[], messages: messageData[] } | null

const data = [
    {
        chatId: '001',
        users: ['1', '2'],
        messages: [
            {
                senderId: '2',
                message: "Hi! How are you?",
                sent: new Date(),

            },
            {
                senderId: '1',
                message: "I am fine! Thanks!",
                sent: new Date(),

            }
        ]
    },
    {
        chatId: '002',
        users: ['3', '4'],
        messages: [
            {
                senderId: '2',
                message: "Hi! How are you?",
                sent: new Date(),

            },
            {
                senderId: '1',
                message: "I am fine! Thanks!",
                sent: new Date(),

            }
        ]
    }


];

export const allChat = (userId: string): chatData[] => {
    let chatsToReturn: chatData[];
    chatsToReturn = [];

    data.map(chat => {
        if (chat.users.includes(userId)) {
            chatsToReturn.push(chat)
        }
    })
    return chatsToReturn;
}