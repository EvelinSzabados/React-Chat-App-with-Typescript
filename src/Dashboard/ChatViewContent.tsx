import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../Context/UserContext';
import { MessageBox, MessageContainer } from './Style';
import { ChatContext } from '../Context/ChatContext';
import Emoji from "react-emoji-render";
import { v4 as uuidv4 } from 'uuid';
import { gql, useSubscription } from '@apollo/client';
import { chatData } from '../Context/ChatData';

export default function ChatViewContainer(props: { chat: string }) {
    const { currentUser } = useContext(UserContext);
    const { chats, setChats } = useContext(ChatContext);
    let allChat = chats;
    let selectedChat = allChat.filter(chatToDisplay => chatToDisplay?.id === props.chat)[0]


    const MESSAGE_SUBSCRIPTION = gql`
        subscription newMessage {
            newMessage {
                id,sender{id,email,status,displayName,profilePictureUrl},text,chat{id}
            } 
        }
    `;
    const { data, loading } = useSubscription(MESSAGE_SUBSCRIPTION);


    useEffect(() => {
        if (!loading && data) {

            allChat.map((chat: chatData) => {
                if (chat)
                    if (chat?.id === data.newMessage.chat.id) {
                        chat.messages.push(data.newMessage)
                        Object.preventExtensions(allChat);
                    }
            })
            setChats([...allChat])

        }
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
