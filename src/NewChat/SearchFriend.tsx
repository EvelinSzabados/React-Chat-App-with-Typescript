import React, { useState } from 'react'
import { Mentions } from 'antd';
import { MentionProps } from 'antd/lib/mentions';


export default function SearchFriend() {

    const [users, setUsers] = useState([
        {
            displayName: "Tamás Sallai",
            email: "tamas@gmail.com"
        },
        {
            displayName: "Eszter Lévai",
            email: "eszter@gmail.com"
        },
        {
            displayName: "Dezső Tóth",
            email: "dezso@gmail.com"
        },

    ]);
    const [search, setSearch] = useState('');

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
            {users.map(({ displayName, email }) => (
                <Option key={email} value={email} className="antd-demo-dynamic-option">
                    <span>{email} - </span>
                    <span>{displayName}</span>
                </Option>
            ))}


        </Mentions>
    )
}
