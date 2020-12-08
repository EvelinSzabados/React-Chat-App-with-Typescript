import React, { useState, useContext, useEffect } from 'react'
import { AutoComplete, Button, message } from 'antd';
import { UserContext, userData } from '../Context/UserContext';
import { FriendContext } from '../Context/FriendContext';
import { NotificationContext, } from '../Context/NotificationContext';
import { v4 as uuidv4 } from 'uuid';
import { useQuery } from '@apollo/client';
import { ALL_USERS_QUERY } from "../Common/GraphqlQueries";

export default function SearchBar() {

    const [value, setValue] = useState('');
    const [options, setOptions] = useState<{ value: string }[]>([]);
    const { currentUser } = useContext(UserContext);
    const { friends } = useContext(FriendContext);
    const { notifications, setNotifications } = useContext(NotificationContext);
    const { data, loading } = useQuery(ALL_USERS_QUERY, { skip: currentUser.id === null, fetchPolicy: 'network-only' });
    //get all users from db
    let users: any[] = !loading && data ? data.users : []

    const sendFriendRequest = (user: userData) => {

        let notifArray = notifications;
        notifArray.push(
            {
                id: parseInt(uuidv4()),
                sender: currentUser,
                reciever: user,

            }
        )
        setTimeout(() => { setNotifications([...notifArray]) }, 700)
        message.success(`Your friend request was successfully sent to ${user.displayName}`, 3)
    }
    const renderItem = (user: userData) => {
        const hasPendingNotification = notifications.filter(notif => notif.reciever.id === user.id || notif.sender.id === user.id).length > 0;

        return {
            value: user.displayName === null ? '' : user.displayName,
            label: (
                <div key={user.id} style={{ display: 'flex', justifyContent: 'space-between', cursor: 'default' }}>

                    <span style={{ minWidth: '150px' }}>{user.displayName}</span>

                    {!hasPendingNotification ?
                        <Button onClick={() => { sendFriendRequest(user) }} style={{ width: '150px' }}>Send friend request</Button>
                        :
                        <Button disabled style={{ width: '150px' }}>Pending request</Button>
                    }
                </div >
            ),
        };
    };
    const onSearch = (searchText: string) => {
        let optionArray: { value: string }[] = []
        searchText = searchText.toLowerCase()
        if (users.length > 0) {
            const exclude = users.filter(user => friends.map(friend => friend.id).indexOf(user.id) === -1);
            exclude.forEach(user => {

                if (user.displayName.toLowerCase().includes(searchText))
                    optionArray.push(renderItem(user))
            })
            setOptions(
                !searchText ? [] : optionArray,
            );
        }

    };

    const onChange = (data: string) => {
        setValue(data);
    };
    return (
        <AutoComplete
            onSelect={() => { setValue('') }}
            onSearch={onSearch}
            backfill={true}
            onChange={onChange}
            value={value}
            style={{ width: 350 }}
            options={options}
            placeholder="Search people on MyChatApp"
        />
    )
}
