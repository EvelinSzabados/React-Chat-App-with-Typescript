import React, { useContext } from 'react'
import { Layout, List, Avatar, Drawer, Badge } from 'antd';
import { Row, Col } from 'antd';
import { ChatViewContainer, DashboardContent, ChatListContainer, ChatListItemContainer, Scrollable } from './Style';
import ChatViewContent from './ChatViewContent';
import Header from './Header';
import { ChatContext } from '../Context/ChatContext';
import { UserContext, userData } from '../Context/UserContext';
import { SelectedChatContext } from '../Context/SelectedChatContext'
import ChatMessageInput from './ChatMessageInput';
import { RouteComponentProps } from 'react-router';
import FloatingButton from '../NewChat/FloatingButton';
import DrawerContent from '../Drawer/Drawer';
import { DrawerVisibleContext } from '../Context/DrawerVisibleContext';
import { StatusColors, Statuses } from '../Context/StatusTypes';
import { useIdleTimer } from 'react-idle-timer';

interface ChildComponentProps extends RouteComponentProps { }

export default function Dashboard(props: ChildComponentProps): JSX.Element {

    const { chats } = useContext(ChatContext);
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const user = JSON.parse(JSON.stringify(currentUser));
    const { selectedChat, setSelectedChat } = useContext(SelectedChatContext);
    const { visible, setVisible } = useContext(DrawerVisibleContext)

    useIdleTimer({
        timeout: 30000,
        onIdle: () => { user.status = Statuses.OFFLINE; setCurrentUser(user) },
        onActive: () => { user.status = Statuses.AVAILABLE; setCurrentUser(user) },
        debounce: 500
    })
    const ProfileDrawer = () => {
        return (
            <Drawer
                width={640}
                title="Profile"
                placement="left"
                closable={true}
                onClose={() => { setVisible(false) }}
                visible={visible}
                style={{ position: 'absolute' }}>
                <DrawerContent />
            </Drawer>
        )
    }


    return (

        <React.Fragment>
            <Layout style={{ height: '100vh' }}>
                <DashboardContent>
                    <ProfileDrawer />
                    <Header setVisible={setVisible} />
                    <Row>
                        <Col span={6}>
                            <ChatListContainer>
                                <Scrollable>
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={chats}
                                        renderItem={chat => {
                                            const friend: userData = chat?.users.filter(user => user.id !== currentUser.id)[0]

                                            return (<ChatListItemContainer selected={chat?.id === selectedChat ? true : false}>
                                                {chat !== null && friend !== null ?
                                                    <List.Item key={chat.id} onClick={() => { setSelectedChat(chat.id) }}>
                                                        <List.Item.Meta
                                                            avatar={<Badge offset={[0, 30]} color={StatusColors[friend.status]}><Avatar size={40} style={{ backgroundColor: '#51588e' }}>{friend.displayName?.slice(0, 1)}</Avatar></Badge>}
                                                            title={friend.displayName}
                                                            description={chat.messages.length === 0 ? 'No messages yet' : chat.messages[chat.messages.length - 1]?.text.slice(0, 30)}
                                                        />
                                                    </List.Item> : <div>No chats available</div>}

                                            </ChatListItemContainer>

                                            )
                                        }}
                                    />
                                </Scrollable>
                                <FloatingButton />

                            </ChatListContainer>
                        </Col>
                        <Col span={18} >
                            <ChatViewContainer>
                                {selectedChat !== undefined && currentUser.id !== null ?
                                    <React.Fragment>
                                        <ChatViewContent chat={selectedChat} />
                                        {chats.length > 0 ? <ChatMessageInput chat={selectedChat} /> : null}

                                    </React.Fragment> : ''}

                            </ChatViewContainer>
                        </Col>

                    </Row>

                </DashboardContent>

            </Layout>

        </React.Fragment>
    )
}





