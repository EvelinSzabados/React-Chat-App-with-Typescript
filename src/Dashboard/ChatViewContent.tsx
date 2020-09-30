import React, { useContext } from 'react'
import { UserContext } from '../Context/UserContext';
import { UserSent, FriendSent, MessageContainer } from './Style';
import { ChatContext } from '../Context/ChatContext';

export default function ChatViewContainer(props: { chat: string }) {
    const { currentUser } = useContext(UserContext);
    const { chats } = useContext(ChatContext);
    const selectedChat = chats.filter(chatToDisplay => { return chatToDisplay?.chatId === props.chat });

    return (
        <MessageContainer>

            {selectedChat.map(chatData => {

                if (chatData !== null) {
                    return chatData.messages.map(messageData => {
                        if (messageData !== null && currentUser.id !== null) {

                            if (messageData.senderId === currentUser.id) {

                                return (<UserSent>{messageData.message}</UserSent>)
                            } else {
                                return (<FriendSent>{messageData.message}</FriendSent>)
                            }
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
