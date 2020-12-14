import React, { useContext } from 'react'
import { userData } from '../Context/UserContext';
import { UserContext } from '../Context/UserContext';
import { ChatContext } from '../Context/ChatContext';
import { FriendContext } from '../Context/FriendContext';
import { chatData } from '../Context/ChatData';
import { NEW_CHAT, DELETE_FRIEND } from "../Common/GraphqlQueries";
import { useMutation } from '@apollo/client';
import { SelectedChatContext } from '../Context/SelectedChatContext';

interface ComponentProps {
    newChat: (friend: userData) => void
    deleteFriend: (friend: userData, friendChat: chatData) => void
}
export default function WithChatActions<T>(Component: React.ComponentType<T & ComponentProps>) {

    const WrappedComponent = (props: T) => {

        const { chats, setChats } = useContext(ChatContext);
        const { currentUser } = useContext(UserContext);
        const { friends, setFriends } = useContext(FriendContext);
        const { setSelectedChat } = useContext(SelectedChatContext)
        const [newChatMutation] = useMutation(NEW_CHAT);
        const [deleteFriendMutation] = useMutation(DELETE_FRIEND)

        function newChat(friend: userData) {
            newChatMutation({ variables: { users: [currentUser.id, friend.id] } })
        }

        function deleteFriend(friend: userData, friendChat: chatData) {
            let friendArray = JSON.parse(JSON.stringify(friends));
            const index = friendArray.indexOf(friend);
            friendArray.splice(index, 1);
            deleteChat(friendChat)
            setFriends([...friendArray]);
            deleteFriendMutation({ variables: { friendId: friend.id } })

        }

        function deleteChat(chat: chatData) {
            let chatArray = JSON.parse(JSON.stringify(chats));
            console.log(chatArray)
            const index = chatArray.indexOf(chat);
            chatArray.splice(index, 1)
            setChats([...chatArray])
            if (chatArray[0] && chatArray.length > 0) {
                setSelectedChat(chatArray[0].id)
            }

        }
        return <Component {...props} newChat={newChat} deleteFriend={deleteFriend} />
    }
    return WrappedComponent;

}
