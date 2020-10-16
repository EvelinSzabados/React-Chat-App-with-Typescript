import React, { useContext } from 'react'
import { Avatar, List, Tag, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { NotificationContext, notificationType } from '../Context/NotificationContext';
import { UserContext } from '../Context/UserContext';

export default function PendingRequests() {
    const { notifications, setNotifications } = useContext(NotificationContext);
    const { currentUser } = useContext(UserContext);

    const sendAnswer = (notif: notificationType) => {
        let notificationArray = notifications;
        const index = notificationArray.indexOf(notif);
        notificationArray.splice(index, 1);

        setNotifications([...notificationArray]);
        message.success(`Friendrequest of ${notif.reciever?.displayName} is withdrawend`, 3);

    }

    return (
        <List
            style={{ marginTop: '1rem' }}
            itemLayout="horizontal"
            dataSource={notifications}
            renderItem={notif => (
                notif.sender?.id === currentUser.id ?
                    <List.Item actions={
                        [
                            <Tag onClick={() => { sendAnswer(notif) }}
                                style={{ cursor: 'pointer' }} icon={<DeleteOutlined />} color="error">Withdraw</Tag>
                        ]
                    }>
                        <List.Item.Meta
                            avatar={<Avatar>{notif.reciever.displayName?.slice(0, 1)}</Avatar>}
                            title={notif.reciever.displayName}
                            description={notif.reciever.email}

                        />
                    </List.Item> : ''

            )}
        />
    )
}
