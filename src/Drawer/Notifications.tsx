import React, { useContext } from 'react'
import { Avatar, List, Tag, message } from 'antd';
import { MessageOutlined, DeleteOutlined } from '@ant-design/icons';
import { NotificationContext, notificationType } from '../Context/NotificationContext';
import { UserContext } from '../Context/UserContext';
import { FriendContext } from '../Context/FriendContext';
import { useMutation } from '@apollo/client';
import { ACCEPT_REQUEST, DECLINE_REQUEST } from "../Common/GraphqlQueries"

export default function Notifications() {

    const { notifications, setNotifications } = useContext(NotificationContext);
    const { friends, setFriends } = useContext(FriendContext);
    const { currentUser } = useContext(UserContext);

    const [acceptRequest] = useMutation(ACCEPT_REQUEST);

    const [declineRequest] = useMutation(DECLINE_REQUEST);

    const sendAnswer = async (accepted: boolean, notif: notificationType) => {

        if (accepted) {
            acceptRequest({ variables: { requestId: notif.id } })
            message.success(`Friendrequest of ${notif.sender?.displayName} is accepted`, 3);

        } else {
            declineRequest({ variables: { requestId: notif.id } })
            message.success(`Friendrequest of ${notif.sender?.displayName} is declined`, 3);
        }

        let notificationArray = notifications;
        const index = notificationArray.indexOf(notif);
        if (notificationArray.length === 1) {
            notificationArray = []
        } else {
            notificationArray.splice(index, 1);
        }


        setNotifications([...notificationArray]);
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
