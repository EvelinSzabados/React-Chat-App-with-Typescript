import React, { useContext, useState } from 'react';
import { message as popupInfo } from 'antd';
import { InputContainer, MessageInput, SubmitButton } from './Style';
import { Popover } from 'antd';
import { SendOutlined, SmileOutlined, FileAddOutlined } from '@ant-design/icons';
import { UserContext } from '../Context/UserContext';
import Picker, { IEmojiData } from 'emoji-picker-react';
import { useMutation } from '@apollo/client';
import { ADD_MESSAGE } from "../Common/GraphqlQueries";


export default function ChatMessageInput(props: { chat: string }) {

    const { currentUser } = useContext(UserContext);
    let selectedChat = props.chat;
    const [message, setMessage] = useState('');
    const [addMessage] = useMutation(ADD_MESSAGE, { fetchPolicy: 'no-cache' });

    const onEmojiClick = (event: MouseEvent, emojiObject: IEmojiData) => {
        setMessage(message + " " + emojiObject.emoji)
    };

    const iconStyle = { fontSize: '25px', margin: '5px', cursor: 'pointer', color: '#51588e' };

    const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        if (currentUser.id !== null) {
            try {
                await addMessage({ variables: { senderId: currentUser.id, chatId: parseInt(selectedChat), text: message } });

            } catch (e) {
                popupInfo.warning("You can not send messages to this chat! Refresh the page!")
            }
        }
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
