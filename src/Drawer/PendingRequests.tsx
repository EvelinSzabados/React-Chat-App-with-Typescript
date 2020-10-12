import React from 'react'
import { Avatar, List, Badge, Tag } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

export default function PendingRequests() {

    const data = [
        {
            displayName: 'Cecília Faragó',
            email: 'cecilia@gmail.com'
        }
    ]
    return (
        <List
            style={{ marginTop: '1rem' }}
            itemLayout="horizontal"
            dataSource={data}
            renderItem={friend => (
                <List.Item actions={
                    [
                        <Tag style={{ cursor: 'pointer' }} icon={<DeleteOutlined />} color="error">Withdraw</Tag>
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
