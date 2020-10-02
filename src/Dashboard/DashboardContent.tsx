import React, { useContext } from 'react'
import { Layout, List, Avatar } from 'antd';
import { Row, Col } from 'antd';
import { ChatViewContainer, DashboardContainer, ChatListContainer, ChatListItemContainer, Scrollable } from './Style';
import ChatViewContent from './ChatViewContent';
import Header from './Header';
import { ChatContext } from '../Context/ChatContext';
import { UserContext } from '../Context/UserContext';
import { SelectedChatContext } from '../Context/SelectedChatContext'
import ChatMessageInput from './ChatMessageInput';
import FloatingButton from '../NewChat/FloatingButton';

export default function DashboardContent() {
    const { selectedChat, setSelectedChat } = useContext(SelectedChatContext);
    const { chats } = useContext(ChatContext);
    const { currentUser } = useContext(UserContext);

    return (
        <Layout style={{ height: '100vh' }}>
            <DashboardContainer>
                <Header />
                <Row>
                    <Col span={6}>
                        <ChatListContainer>
                            <Scrollable>
                                <List
                                    itemLayout="horizontal"
                                    dataSource={chats}
                                    renderItem={((chat: any) => (
                                        <ChatListItemContainer selected={chat?.chatId === selectedChat ? true : false}>
                                            {chat !== null ?
                                                <List.Item onClick={() => { setSelectedChat(chat.chatId) }}>
                                                    <List.Item.Meta
                                                        avatar={<Avatar size={40} style={{ backgroundColor: '#51588e' }}>{chat.users.filter((user: any) => user.id !== currentUser.id)[0].displayName[0]}</Avatar>}
                                                        title={chat.users.filter((user: any) => user.id !== currentUser.id)[0].displayName}
                                                        description={chat.messages[chat.messages.length - 1]?.message.slice(0, 30)}
                                                    />
                                                </List.Item> : <div>No chats available</div>}

                                        </ChatListItemContainer>
                                    ))}
                                />
                            </Scrollable>
                            <FloatingButton />
                        </ChatListContainer>
                    </Col>
                    <Col span={18}>
                        <ChatViewContainer>
                            {selectedChat !== undefined && currentUser.id !== null ?
                                <React.Fragment>
                                    <ChatViewContent chat={selectedChat} />
                                    <ChatMessageInput chat={selectedChat} />
                                </React.Fragment> : ''}

                        </ChatViewContainer></Col>
                </Row>

            </DashboardContainer>

        </Layout>
    )
}
