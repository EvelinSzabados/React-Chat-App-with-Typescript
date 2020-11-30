import React, { useContext, useEffect } from 'react'
import { UserContext } from '../Context/UserContext';
import { MessageBox, MessageContainer } from './Style';
import { ChatContext } from '../Context/ChatContext';
import Emoji from "react-emoji-render";
import { v4 as uuidv4 } from 'uuid';
import { gql, useSubscription } from '@apollo/client';
import { chatData } from '../Context/ChatData';

export default function ChatViewContainer(props: { chat: string }) {

    const MESSAGE_SUBSCRIPTION = gql`
    subscription newMessage {
        newMessage {
            id,sender{id,email,status,displayName,profilePictureUrl},text,chat{id}
        } 
    }
`;
    const { currentUser } = useContext(UserContext);
    const { chats, setChats } = useContext(ChatContext);
    const selectedChat = chats.filter(chatToDisplay => chatToDisplay?.id === props.chat)[0]
    const { data, loading } = useSubscription(MESSAGE_SUBSCRIPTION, { fetchPolicy: 'network-only', shouldResubscribe: true });


    useEffect(() => {
        let allChat = JSON.parse(JSON.stringify(chats))
        if (!loading && data) {

            allChat.forEach((chat: chatData) => {
                if (chat)
                    if (chat?.id === data.newMessage.chat.id) {
                        chat.messages.push(data.newMessage)

                    }
            })
            setChats([...allChat])
        }
        //eslint-disable-next-line
    }, [data])
    useEffect(() => {
        const chatView = document.getElementById('chat-container')!;
        chatView.scrollTo(0, chatView.scrollHeight);

    }, [chats, selectedChat])
    return (
        <MessageContainer id="chat-container">
            {selectedChat ? selectedChat.messages.map(messageData => {
                return (
                    <MessageBox key={uuidv4()} isFriendSent={messageData?.sender.id !== currentUser.id}>
                        <Emoji text={messageData?.text} />
                    </MessageBox>)
            }

            ) : null}


        </MessageContainer>
    )
}
