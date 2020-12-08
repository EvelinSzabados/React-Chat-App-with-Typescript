import React, { useContext } from 'react'
import { Avatar, List, Tag, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { NotificationContext, notificationType } from '../Context/NotificationContext';
import { UserContext } from '../Context/UserContext';
import { gql, useMutation } from '@apollo/client';

export default function PendingRequests() {
    const { notifications, setNotifications } = useContext(NotificationContext);
    const { currentUser } = useContext(UserContext);

    const DECLINE_REQUEST = gql`

    mutation declineRequest($requestId: ID!) {
        declineRequest(requestId: $requestId){id}
    }`;
    const [declineRequest] = useMutation(DECLINE_REQUEST);
    const sendAnswer = (notif: notificationType) => {
        let notificationArray = notifications;
        const index = notificationArray.indexOf(notif);
        if (notificationArray.length === 1) {
            notificationArray = []
        } else {
            notificationArray.splice(index, 1);
        }

        setNotifications([...notificationArray]);
        declineRequest({ variables: { requestId: notif.id } })
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
