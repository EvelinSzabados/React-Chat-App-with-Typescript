import React, { useContext } from 'react'
import { UserContext } from '../Context/UserContext';
import { UserSent, FriendSent, MessageContainer } from './Style';

export default function ChatViewContainer() {
    const { currentUser } = useContext(UserContext);

    const messages = [
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
    return (
        <MessageContainer>
            {messages.map(messageData => {
                if (messageData.senderId === currentUser.id) {
                    return (<UserSent>{messageData.message}</UserSent>)
                } else {
                    return (<FriendSent>{messageData.message}</FriendSent>)
                }
            })}
        </MessageContainer>
    )
}
