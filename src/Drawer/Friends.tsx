import React, { useContext, useState } from 'react'
import { FriendContext } from '../Context/FriendContext';
import { Avatar, List, Badge, Tag, Input, Popconfirm, Empty } from 'antd';
import { MessageOutlined, DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { StatusColors } from '../Context/StatusTypes';
import { userData } from '../Context/UserContext';

export default function Friends() {
    const { Search } = Input;
    const { friends } = useContext(FriendContext);
    const [searchResults, setSearchResults] = useState<userData[]>(friends.slice(0, 5))

    const searchUsers = (searchValue: string) => {
        let result = friends.filter(friend => friend.displayName?.includes(searchValue)
            || friend.email?.includes(searchValue))
        setSearchResults(result)
    }
    return (
        <React.Fragment>
            {friends[0].id === null ? <Empty description="No friends found" /> :
                <React.Fragment>
                    <Search
                        placeholder="Search friends"
                        onChange={e => searchUsers(e.target.value)}
                    />
                    <List
                        style={{ marginTop: '1rem' }}
                        itemLayout="horizontal"
                        locale={{ emptyText: "No friends found" }}
                        dataSource={searchResults}
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
                                    avatar={<Badge offset={[0, 30]} color={StatusColors[friend.status]}><Avatar>{friend.displayName?.slice(0, 1)}</Avatar></Badge>}
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
