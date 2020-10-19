import React, { useContext, useEffect } from 'react'
import { UserContext } from '../Context/UserContext';
import { MessageBox, MessageContainer } from './Style';
import { ChatContext } from '../Context/ChatContext';
import Emoji from "react-emoji-render";
import { v4 as uuidv4 } from 'uuid';

export default function ChatViewContainer(props: { chat: string }) {
    const { currentUser } = useContext(UserContext);
    const { chats } = useContext(ChatContext);
    let selectedChat = chats.filter(chatToDisplay => { return chatToDisplay?.chatId === props.chat })

    useEffect(() => {
        const chatView = document.getElementById('chat-container')!;
        chatView.scrollTo(0, chatView.scrollHeight);
    }, [chats, selectedChat])
    return (
        <MessageContainer id="chat-container">

            {selectedChat.map(chatData => {

                if (chatData !== null) {
                    return chatData.messages.map(messageData => {
                        if (messageData !== null && currentUser.id !== null) {

                            return (
                                <MessageBox key={uuidv4()} isFriendSent={messageData.senderId !== currentUser.id}>
                                    <Emoji text={messageData.message} />
                                </MessageBox>)
                        } else {
                            return null;
                        }
                    })
                } else {
                    return null;
                }

            })}

        </MessageContainer>
    )
}
