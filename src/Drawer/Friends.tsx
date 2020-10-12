import React, { useContext } from 'react'
import { FriendContext } from '../Context/FriendContext';
import { Avatar, List, Badge, Tag, Input, Popconfirm, Empty } from 'antd';
import { MessageOutlined, DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';

export default function Friends() {
    const { Search } = Input;
    const { friends } = useContext(FriendContext);

    return (
        <React.Fragment>
            {friends[0].id === null ? <Empty description="No friends found" /> :
                <React.Fragment>
                    <Search
                        placeholder="Search friends"
                        onSearch={value => console.log(value)}
                    />
                    <List
                        style={{ marginTop: '1rem' }}
                        itemLayout="horizontal"
                        dataSource={friends}
                        renderItem={friend => (
                            <List.Item actions={
                                [<Tag color="geekblue" style={{ cursor: 'pointer' }} icon={<MessageOutlined />}>Message</Tag>,
                                <Popconfirm
                                    title="Are you sure？"
                                    onConfirm={() => { console.log(`Deleted ${friend.displayName}`) }}
                                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                >
                                    <Tag style={{ cursor: 'pointer' }} icon={<DeleteOutlined />} color="error">Delete</Tag>
                                </Popconfirm>,

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
                </React.Fragment>}
        </React.Fragment>
    )
}
