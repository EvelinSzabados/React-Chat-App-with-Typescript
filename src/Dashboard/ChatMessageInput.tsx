import React from 'react';
import { InputContainer, MessageInput } from './Style';
import { SendOutlined, SmileOutlined, FileAddOutlined } from '@ant-design/icons';

export default function ChatMessageInput() {
    const iconStyle = { fontSize: '25px', margin: '5px', cursor: 'pointer', color: '#51588e' };
    return (
        <InputContainer>
            <MessageInput type="text" />
            <FileAddOutlined style={iconStyle} />
            <SmileOutlined style={iconStyle} /><SendOutlined
                style={iconStyle}
            />
        </InputContainer>
    )
}
