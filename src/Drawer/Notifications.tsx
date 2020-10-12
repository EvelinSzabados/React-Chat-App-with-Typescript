import React from 'react'
import { Avatar, List, Badge, Tag } from 'antd';
import { MessageOutlined, DeleteOutlined } from '@ant-design/icons';

export default function Notifications() {

    const data = [
        {
            displayName: 'Ádám Kovács',
            email: 'adam@gmail.com'
        }
    ]
    return (
        <List
            style={{ marginTop: '1rem' }}
            itemLayout="horizontal"
            dataSource={data}
            renderItem={friend => (
                <List.Item actions={
                    [<Tag color="geekblue" style={{ cursor: 'pointer' }} icon={<MessageOutlined />}>Accept</Tag>,
                    <Tag style={{ cursor: 'pointer' }} icon={<DeleteOutlined />} color="error">Decline</Tag>

                    ]
                }>
                    <List.Item.Meta
                        avatar={<Badge offset={[0, 30]} status="success"><Avatar>{friend.displayName?.slice(0, 1)}</Avatar></Badge>}
                        title={friend.displayName}
                        description={friend.email}

                    />
                </List.Item>

            )}
        />
    )
}
