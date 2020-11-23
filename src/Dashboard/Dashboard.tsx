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
import { StatusColors } from '../Context/StatusTypes';


interface ChildComponentProps extends RouteComponentProps { }

export default function Dashboard(props: ChildComponentProps): JSX.Element {

    const { chats } = useContext(ChatContext);
    const { currentUser } = useContext(UserContext);
    const { selectedChat, setSelectedChat } = useContext(SelectedChatContext);
    const { visible, setVisible } = useContext(DrawerVisibleContext)


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
                                        <ChatMessageInput chat={selectedChat} />
                                    </React.Fragment> : ''}

                            </ChatViewContainer>
                        </Col>

                    </Row>

                </DashboardContent>
                <Layout.Footer style={{
                    backgroundColor: '#51588E', padding: '0.5rem', color: 'white',
                    width: '80%', margin: '0 auto', textAlign: 'center'
                }}>
                    Kinsta Pet Project</Layout.Footer>
            </Layout>

        </React.Fragment>
    )
}



