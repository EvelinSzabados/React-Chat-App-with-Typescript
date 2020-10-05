import React, { useContext } from 'react'
import { Mentions } from 'antd';
import { MentionProps } from 'antd/lib/mentions';
import { FriendContext } from '../Context/FriendContext';
import { ChatContext } from '../Context/ChatContext';
import { UserContext } from '../Context/UserContext';
import { userData } from '../Context/UserContext';
import { SelectedChatContext } from '../Context/SelectedChatContext'
import { v4 as uuidv4 } from 'uuid';

export default function SearchFriend() {

    const { friends } = useContext(FriendContext);
    const { chats, setChats } = useContext(ChatContext);
    const { currentUser } = useContext(UserContext);
    const { setSelectedChat } = useContext(SelectedChatContext);
    const { Option } = Mentions;


    function getFriendByEmail(email: string | undefined): userData[] {
        return friends.filter(friend => friend.email === email)
    }

    function onSelect(option: MentionProps) {

        const selectedFriend = getFriendByEmail(option.value)
        let chatList = chats;
        const chatId = uuidv4();
        chatList.push({
            chatId: chatId,
            users: [
                {
                    id: currentUser.id,
                    displayName: currentUser.displayName
                },
                {
                    id: selectedFriend[0].id,
                    displayName: selectedFriend[0].displayName

                }
            ],
            messages: []
        })
        setChats([...chatList])
        setSelectedChat(chatId)

    }
    return (
        <Mentions style={{ width: '100%' }}
            onSelect={onSelect} placeholder="@friend email" autoSize={false}>
            {friends.map(({ id, displayName, email }) => (
                <Option key={id} value={email !== null ? email : ''} className="antd-demo-dynamic-option">
                    <span>{displayName} - </span>
                    <span>{email}</span>
                </Option>
            ))}


        </Mentions>
    )
}
