import React, { useContext, useState } from 'react';
import { InputContainer, MessageInput, SubmitButton } from './Style';
import { SendOutlined, SmileOutlined, FileAddOutlined } from '@ant-design/icons';
import { ChatContext } from '../Context/ChatContext';
import { UserContext } from '../Context/UserContext';


export default function ChatMessageInput(props: { chat: string }) {
    const { chats, setChats } = useContext(ChatContext);
    const { currentUser } = useContext(UserContext);
    let selectedChat = props.chat;
    const [message, setMessage] = useState('');


    const iconStyle = { fontSize: '25px', margin: '5px', cursor: 'pointer', color: '#51588e' };

    const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let allChats = chats;
        let currentChat = allChats.filter(chat => chat?.chatId === selectedChat);
        if (currentChat[0] !== null && currentUser.id !== null) {
            currentChat[0]?.messages.push({
                senderId: currentUser.id,
                message: message,
                sent: new Date(),
            })
        }

        setChats([...allChats])
        setMessage('');

    }
    return (
        <InputContainer>
            <form id="sendmsg" onSubmit={(e) => { sendMessage(e) }}>
                <MessageInput type="text" value={message} onChange={(e) => { setMessage(e.target.value) }} />
                <FileAddOutlined style={iconStyle} />
                <SmileOutlined style={iconStyle} />
                <SubmitButton type="submit"><SendOutlined
                    style={iconStyle}
                /></SubmitButton>
            </form>
        </InputContainer>
    )
}
