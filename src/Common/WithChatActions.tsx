import React, { useContext } from 'react'
import { userData } from '../Context/UserContext';
import { v4 as uuidv4 } from 'uuid';
import { UserContext } from '../Context/UserContext';
import { SelectedChatContext } from '../Context/SelectedChatContext';
import { ChatContext } from '../Context/ChatContext';
import { FriendContext } from '../Context/FriendContext';
import { chatData } from '../Context/ChatData';
import { Statuses } from '../Context/StatusTypes';

interface ComponentProps {
    newChat: (friend: userData) => void
    deleteFriend: (friend: userData, friendChat: chatData) => void
}
export default function WithChatActions<T>(Component: React.ComponentType<T & ComponentProps>) {

    const WrappedComponent = (props: T) => {
        const { setSelectedChat } = useContext(SelectedChatContext);
        const { chats, setChats } = useContext(ChatContext);
        const { currentUser } = useContext(UserContext);
        const { friends, setFriends } = useContext(FriendContext);

        function newChat(friend: userData) {
            let chatList = chats;
            const chatId = uuidv4();
            chatList.push({
                id: chatId,
                users: [
                    {
                        id: currentUser.id,
                        displayName: currentUser.displayName,
                        status: Statuses.Offline
                    },
                    {
                        id: friend.id,
                        displayName: friend.displayName,
                        status: Statuses.Offline

                    }
                ],
                messages: []
            })
            setChats([...chatList])
            setSelectedChat(chatId)
        }

        function deleteFriend(friend: userData, friendChat: chatData) {
            let friendArray = friends;
            const index = friendArray.indexOf(friend);
            friendArray.splice(index, 1);
            setFriends([...friendArray]);
            deleteChat(friendChat)
        }

        function deleteChat(chat: chatData) {
            let chatArray = chats;
            const index = chatArray.indexOf(chat);
            chatArray.splice(index, 1)
            setChats([...chatArray])
        }
        return <Component {...props} newChat={newChat} deleteFriend={deleteFriend} />
    }
    return WrappedComponent;

}
