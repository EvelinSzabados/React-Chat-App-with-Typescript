import React, { useContext } from 'react'
import { userData } from '../Context/UserContext';
import { v4 as uuidv4 } from 'uuid';
import { UserContext } from '../Context/UserContext';
import { SelectedChatContext } from '../Context/SelectedChatContext';
import { ChatContext } from '../Context/ChatContext';
// WrappedComponent: React.ComponentType<{ newChat: (friend: userData) => void; }>

interface ComponentProps {
    newChat: (friend: userData) => void
}
export default function WithNewChat<T>(Component: React.ComponentType<T & ComponentProps>) {

    const WrappedComponent = (props: T) => {
        const { setSelectedChat } = useContext(SelectedChatContext);
        const { chats, setChats } = useContext(ChatContext);
        const { currentUser } = useContext(UserContext);

        function newChat(friend: userData) {
            let chatList = chats;
            const chatId = uuidv4();
            chatList.push({
                chatId: chatId,
                users: [
                    {
                        id: currentUser.id,
                        displayName: currentUser.displayName
                    },
                    {
                        id: friend.id,
                        displayName: friend.displayName

                    }
                ],
                messages: []
            })
            setChats([...chatList])
            setSelectedChat(chatId)
        }
        return <Component {...props} newChat={newChat} />
    }
    return WrappedComponent;

}
