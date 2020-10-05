import React, { useContext } from 'react'
import { Mentions } from 'antd';
import { MentionProps } from 'antd/lib/mentions';
import { FriendContext } from '../Context/FriendContext';

export default function SearchFriend() {

    const { friends } = useContext(FriendContext);
    const { Option } = Mentions;

    function onChange(value: string) {
        console.log('Change:', value);
    }

    function onSelect(option: MentionProps) {
        console.log('select', option);
    }
    return (
        <Mentions style={{ width: '100%' }} onChange={onChange}
            onSelect={onSelect} placeholder="@friend email">
            {friends.map(({ id, displayName, email }) => (
                <Option key={id} value={id !== null ? id + ":" + email + ":" + displayName : ''} className="antd-demo-dynamic-option">
                    <span>{displayName} - </span>
                    <span>{email}</span>

                </Option>
            ))}


        </Mentions>
    )
}
