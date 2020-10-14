import React, { useContext, useState } from 'react'
import { FriendContext } from '../Context/FriendContext';
import { Avatar, List, Badge, Tag, Input, Popconfirm, Empty, message } from 'antd';
import { MessageOutlined, DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { StatusColors } from '../Context/StatusTypes';
import { userData } from '../Context/UserContext';
import { SelectedChatContext } from '../Context/SelectedChatContext';
import { ChatContext } from '../Context/ChatContext';
import { DrawerVisibleContext } from '../Context/DrawerVisibleContext';
import { v4 as uuidv4 } from 'uuid';
import { UserContext } from '../Context/UserContext';

export default function Friends() {
    const { Search } = Input;
    const { friends } = useContext(FriendContext);
    const { setSelectedChat } = useContext(SelectedChatContext);
    const { chats, setChats } = useContext(ChatContext);
    const [searchResults, setSearchResults] = useState<userData[]>(friends.slice(0, 5))
    const { setVisible } = useContext(DrawerVisibleContext)
    const { currentUser } = useContext(UserContext);

    const searchUsers = (searchValue: string) => {
        let result = friends.filter(friend => friend.displayName?.includes(searchValue)
            || friend.email?.includes(searchValue))
        setSearchResults(result)
    }

    const newChat = (friend: userData) => {
        let chatList = chats;
        const chatId = uuidv4();
        chatList.push({
            chatId: chatId,
            users: [
                {
                    id: currentUser.id,
                    displayName: currentUser.displayName
                },
                {
                    id: friend.id,
                    displayName: friend.displayName

                }
            ],
            messages: []
        })
        setChats([...chatList])
        setSelectedChat(chatId)
    }

    const getChatWithFriend = (friendId: string | null) => {

        let chatIdWithFriend = '';
        chats.forEach(chat => {
            if (chat !== null) {
                if (chat?.users.filter(user => user.id === friendId).length > 0) {
                    chatIdWithFriend = chat.chatId
                }
            }

        })
        return chatIdWithFriend;

    }

    const handleFriendActions = (friend: userData) => {
        const chatWithFriend = getChatWithFriend(friend.id)
        if (chatWithFriend !== '') {
            setVisible(false)
            message.loading('Loading...', 0.75)
            setTimeout(() => {
                setSelectedChat(chatWithFriend)
            }, 700)

        } else {
            setVisible(false)
            message.loading('Loading...', 0.75)
            setTimeout(() => {
                newChat(friend)
            }, 700)


        }
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
                        pagination={searchResults.length > 5 ? { defaultCurrent: 1, total: searchResults.length, pageSize: 5 } : false}
                        style={{ marginTop: '1rem' }}
                        itemLayout="horizontal"
                        locale={{ emptyText: "No friends found" }}
                        dataSource={searchResults}
                        renderItem={friend => (
                            <List.Item actions={
                                [<Tag color="geekblue" onClick={() => { handleFriendActions(friend) }} style={{ cursor: 'pointer' }} icon={<MessageOutlined />}>Message</Tag>,
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
