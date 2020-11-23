import React, { useContext, useState } from 'react';
import { InputContainer, MessageInput, SubmitButton } from './Style';
import { Popover } from 'antd';
import { SendOutlined, SmileOutlined, FileAddOutlined } from '@ant-design/icons';
import { ChatContext } from '../Context/ChatContext';
import { UserContext } from '../Context/UserContext';
import Picker, { IEmojiData } from 'emoji-picker-react';


export default function ChatMessageInput(props: { chat: string }) {
    const { chats, setChats } = useContext(ChatContext);
    const { currentUser } = useContext(UserContext);
    let selectedChat = props.chat;
    const [message, setMessage] = useState('');


    const onEmojiClick = (event: MouseEvent, emojiObject: IEmojiData) => {
        setMessage(message + " " + emojiObject.emoji)
    };

    const iconStyle = { fontSize: '25px', margin: '5px', cursor: 'pointer', color: '#51588e' };

    const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let allChats = chats;
        let currentChat = allChats.filter(chat => chat?.id === selectedChat);
        // if (currentChat[0] !== null && currentUser.id !== null) {
        //     currentChat[0]?.messages.push({
        //         sender: currentUser.id,
        //         text: message,
        //     })
        // }

        setChats([...allChats])
        setMessage('');

    }
    return (
        <InputContainer>
            <form id="sendmsg" onSubmit={(e) => { sendMessage(e) }}>
                <MessageInput type="text" value={message} onChange={(e) => { setMessage(e.target.value) }} />
                <FileAddOutlined style={iconStyle} />

                <Popover content={<Picker onEmojiClick={onEmojiClick} />} title="Select emoji" trigger="click">
                    <SmileOutlined style={iconStyle} />
                </Popover>

                <SubmitButton type="submit"><SendOutlined
                    style={iconStyle}
                /></SubmitButton>
            </form>
        </InputContainer>
    )
}
