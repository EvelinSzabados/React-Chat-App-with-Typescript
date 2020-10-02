import React, { useContext } from 'react'
import { UserContext } from '../Context/UserContext';
import { MessageBox, MessageContainer } from './Style';
import { ChatContext } from '../Context/ChatContext';
import Emoji from "react-emoji-render";

export default function ChatViewContainer(props: { chat: string }) {
    const { currentUser } = useContext(UserContext);
    const { chats } = useContext(ChatContext);
    let selectedChat = chats.filter(chatToDisplay => { return chatToDisplay?.chatId === props.chat })

    return (
        <MessageContainer>

            {selectedChat.map(chatData => {
                console.log(chats)
                if (chatData !== null) {
                    return chatData.messages.map(messageData => {
                        if (messageData !== null && currentUser.id !== null) {

                            return (
                                <MessageBox isFriendSent={messageData.senderId !== currentUser.id}>
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
