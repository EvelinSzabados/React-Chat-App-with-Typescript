import React, { useContext } from 'react'
import { Avatar, List, Tag, message } from 'antd';
import { MessageOutlined, DeleteOutlined } from '@ant-design/icons';
import { NotificationContext, notificationType } from '../Context/NotificationContext';
import { UserContext } from '../Context/UserContext';
import { FriendContext } from '../Context/FriendContext';

export default function Notifications() {

    const { notifications, setNotifications } = useContext(NotificationContext);
    const { friends, setFriends } = useContext(FriendContext);
    const { currentUser } = useContext(UserContext);

    const sendAnswer = (accepted: boolean, notif: notificationType) => {
        let notificationArray = notifications;
        const index = notificationArray.indexOf(notif);
        notificationArray.splice(index, 1);

        setNotifications([...notificationArray]);
        if (accepted) {
            message.success(`Friendrequest of ${notif.sender?.displayName} is accepted`, 3);
            setFriends([...friends, notif.sender])

        } else {
            message.success(`Friendrequest of ${notif.sender?.displayName} is declined`, 3);
        }

    }
    return (
        <List
            style={{ marginTop: '1rem' }}
            itemLayout="horizontal"
            dataSource={notifications}
            renderItem={notif => (

                notif.reciever?.id === currentUser.id ?

                    <List.Item actions={
                        [
                            <Tag onClick={() => { sendAnswer(true, notif) }} color="geekblue" style={{ cursor: 'pointer' }} icon={<MessageOutlined />}>Accept</Tag>,
                            <Tag onClick={() => { sendAnswer(false, notif) }} style={{ cursor: 'pointer' }} icon={<DeleteOutlined />} color="error">Decline</Tag>

                        ]
                    }>
                        <List.Item.Meta
                            avatar={<Avatar>{notif.sender?.displayName?.slice(0, 1)}</Avatar>}
                            title={notif.sender?.displayName}
                            description={notif.sender?.email}

                        />
                    </List.Item> : ''

            )}
        />
    )
}
