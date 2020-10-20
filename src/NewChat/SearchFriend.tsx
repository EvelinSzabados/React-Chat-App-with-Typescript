import React, { useContext } from 'react'
import { Mentions } from 'antd';
import { MentionProps } from 'antd/lib/mentions';
import { FriendContext } from '../Context/FriendContext';
import { userData } from '../Context/UserContext';
import WithChatActions from '../Common/WithChatActions';

function SearchFriend(props: { newChat?: (friend: userData) => void }) {

    const { friends } = useContext(FriendContext);
    const { Option } = Mentions;

    function getFriendByEmail(email: string | undefined): userData[] {
        // will be single backend axios call
        return friends.filter(friend => friend.email === email)
    }


    function onSelect(option: MentionProps) {
        // check if chat already exists with user will be implemented on backend
        const selectedFriend = getFriendByEmail(option.value)
        if (props.newChat !== undefined)
            props.newChat(selectedFriend[0])

    }
    return (
        <Mentions style={{ width: '100%' }}
            onSelect={onSelect} prefix='' placeholder="@friend email" autoSize={false} defaultValue=''>
            {friends.map(({ id, displayName, email }) => (
                <Option key={id} value={email !== null ? email : ''} className="antd-demo-dynamic-option">
                    <span>{displayName} - </span>
                    <span>{email}</span>
                </Option>
            ))}


        </Mentions>
    )
}

export default WithChatActions(SearchFriend)