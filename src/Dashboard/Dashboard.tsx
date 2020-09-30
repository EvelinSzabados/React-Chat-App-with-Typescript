import React, { useContext, useState } from 'react'
import { Layout, List, Avatar } from 'antd';
import { Row, Col } from 'antd';
import { ChatViewContainer, DashboardContent, ChatListContainer, ChatListItemContainer } from './Style';
import ChatViewContent from './ChatViewContent';
import ChatMessageInput from './ChatMessageInput';
import Header from './Header';
import { ChatContext } from '../Context/ChatContext';
import { UserContext } from '../Context/UserContext';

export default function Dashboard() {

    const { chats } = useContext(ChatContext);
    const { currentUser } = useContext(UserContext);
    let initialChat = null;
    if (chats !== null && chats.length > 0) {
        initialChat = chats[0]?.chatId
    }
    const [selectedChat, setSelectedChat] = useState(initialChat);


    return (
        <Layout style={{ height: '100vh' }}>
            <DashboardContent>
                <Header />
                <Row>
                    <Col span={6}>
                        <ChatListContainer>
                            <List
                                itemLayout="horizontal"
                                dataSource={chats}
                                renderItem={chat => (
                                    <ChatListItemContainer selected={chat?.chatId === selectedChat ? true : false}>
                                        {chat !== null ?
                                            <List.Item onClick={() => { setSelectedChat(chat.chatId) }}>
                                                <List.Item.Meta
                                                    avatar={<Avatar size={40} style={{ backgroundColor: '#51588e' }}>{chat.users.filter(user => user.id !== currentUser.id)[0].displayName[0]}</Avatar>}
                                                    title={chat.users.filter(user => user.id !== currentUser.id)[0].displayName}
                                                    description={chat.messages[chat.messages.length - 1]?.message.slice(0, 30)}
                                                />
                                            </List.Item> : <div>No chats available</div>}

                                    </ChatListItemContainer>
                                )}
                            />
                        </ChatListContainer>
                    </Col>
                    <Col span={18}>
                        <ChatViewContainer>
                            {selectedChat !== null ?
                                <React.Fragment>
                                    <ChatViewContent chat={selectedChat} />
                                    <ChatMessageInput />
                                </React.Fragment> : 'Select a chat'}

                        </ChatViewContainer></Col>
                </Row>
            </DashboardContent>
        </Layout>
    )
}



