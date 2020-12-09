import React, { useContext, useState } from 'react'
import { FriendContext } from '../Context/FriendContext';
import { Avatar, List, Badge, Tag, Input, Popconfirm, Empty, message } from 'antd';
import { MessageOutlined, DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { StatusColors } from '../Context/StatusTypes';
import { userData } from '../Context/UserContext';
import { SelectedChatContext } from '../Context/SelectedChatContext';
import { ChatContext } from '../Context/ChatContext';
import { DrawerVisibleContext } from '../Context/DrawerVisibleContext';
import WithChatActions from '../Common/WithChatActions'
import { chatData } from '../Context/ChatData';

interface PropTypes {
    newChat?: (friend: userData) => void,
    deleteFriend?: (friend: userData, friendChat: chatData) => {}
}
function Friends(props: PropTypes) {
    const { Search } = Input;
    const { friends } = useContext(FriendContext);
    const { setSelectedChat } = useContext(SelectedChatContext);
    const { chats } = useContext(ChatContext);
    const [searchResults, setSearchResults] = useState<userData[]>([])
    const { setVisible } = useContext(DrawerVisibleContext)


    const searchUsers = (searchValue: string) => {
        let result = friends.filter(friend => friend.displayName?.toLocaleLowerCase().includes(searchValue.toLowerCase())
            || friend.email?.includes(searchValue))
        setSearchResults(result)
    }

    function getChatWithFriend(friendId: number | null): chatData {

        let chatWithFriend = null;
        chats.forEach(chat => {
            if (chat !== null) {
                if (chat?.users.filter(user => user.id === friendId).length > 0) {
                    chatWithFriend = chat
                }
            }
        })
        return chatWithFriend;

    }

    const handleFriendActions = (friend: userData) => {
        const chatWithFriend = getChatWithFriend(friend.id)
        if (chatWithFriend !== null) {
            setVisible(false)
            message.loading('Loading...', 0.75)
            setTimeout(() => {
                setSelectedChat(chatWithFriend?.id)
            }, 700)

        } else {
            setVisible(false)
            message.loading('Loading...', 0.75)
            setTimeout(() => {
                if (props.newChat !== undefined)
                    props.newChat(friend)
            }, 700)


        }
    }
    return (
        <React.Fragment>
            {friends.length === 0 || friends[0].id === null ? <Empty description="No friends found" /> :
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
                        dataSource={searchResults.length > 0 ? searchResults : friends}
                        renderItem={friend => (
                            <List.Item actions={
                                [<Tag color="geekblue" onClick={() => { handleFriendActions(friend) }} style={{ cursor: 'pointer' }} icon={<MessageOutlined />}>Message</Tag>,
                                <Popconfirm
                                    title="Are you sure？"
                                    onConfirm={() => {

                                        message.loading('Loading...', 0.75)
                                        setTimeout(() => {
                                            if (props.deleteFriend !== undefined) {
                                                props.deleteFriend(friend, getChatWithFriend(friend.id))
                                                setVisible(false)
                                            }
                                        }, 700)



                                    }}
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
export default WithChatActions(Friends)