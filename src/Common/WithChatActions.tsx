import React, { useContext, useEffect } from 'react'
import { userData } from '../Context/UserContext';
import { v4 as uuidv4 } from 'uuid';
import { UserContext } from '../Context/UserContext';
import { SelectedChatContext } from '../Context/SelectedChatContext';
import { ChatContext } from '../Context/ChatContext';
import { FriendContext } from '../Context/FriendContext';
import { chatData } from '../Context/ChatData';
import { NEWCHAT_SUBSCRIPTION, NEW_CHAT } from "../Common/GraphqlQueries";
import { useSubscription, useMutation } from '@apollo/client';

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
        const [newChatMutation] = useMutation(NEW_CHAT);
        const { data: newChatData, loading: newChatDataIsLoading } = useSubscription(NEWCHAT_SUBSCRIPTION, {
            fetchPolicy: 'network-only',
            skip: currentUser.id === null,
            shouldResubscribe: true,
        });

        useEffect(() => {
            let chatList = JSON.parse(JSON.stringify(chats))
            if (!newChatDataIsLoading && newChatData) {
                console.log(newChatData)
                chatList.push(newChatData.newChat)
                setChats([...chatList])
                setSelectedChat(newChatData.newChat.id)
            }
            //eslint-disable-next-line
        }, [])
        function newChat(friend: userData) {
            newChatMutation({ variables: { users: [currentUser.id, friend.id] } })
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
