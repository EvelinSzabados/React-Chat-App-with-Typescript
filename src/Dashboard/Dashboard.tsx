import React, { useContext } from 'react'
import { Layout, List, Avatar, Drawer } from 'antd';
import { Row, Col } from 'antd';
import { ChatViewContainer, DashboardContent, ChatListContainer, ChatListItemContainer, Scrollable } from './Style';
import ChatViewContent from './ChatViewContent';
import Header from './Header';
import { ChatContext } from '../Context/ChatContext';
import { UserContext } from '../Context/UserContext';
import { SelectedChatContext } from '../Context/SelectedChatContext'
import ChatMessageInput from './ChatMessageInput';
import { RouteComponentProps } from 'react-router';
import FloatingButton from '../NewChat/FloatingButton';
import DrawerContent from '../Drawer/Drawer';
import { DrawerVisibleContext } from '../Context/DrawerVisibleContext';


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
                                        renderItem={chat => (

                                            <ChatListItemContainer selected={chat?.chatId === selectedChat ? true : false}>
                                                {chat !== null ?
                                                    <List.Item key={chat.chatId} onClick={() => { setSelectedChat(chat.chatId) }}>
                                                        <List.Item.Meta
                                                            avatar={<Avatar size={40} style={{ backgroundColor: '#51588e' }}>{chat.users.filter(user => user.id !== currentUser.id)[0].displayName[0]}</Avatar>}
                                                            title={chat.users.filter(user => user.id !== currentUser.id)[0].displayName}
                                                            description={chat.messages.length === 0 ? 'No messages yet' : chat.messages[chat.messages.length - 1]?.message.slice(0, 30)}
                                                        />
                                                    </List.Item> : <div>No chats available</div>}

                                            </ChatListItemContainer>

                                        )}
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



